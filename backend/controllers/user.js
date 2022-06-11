const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const isAvatar = req.body.avatar;
    let myCloud;
    if (isAvatar) {
      myCloud = await cloudinary.v2.uploader
        .upload(req.body.avatar, {
          folder: "avatars",
        })
        .catch((error) => console.log(error));
    }

    let avatar = isAvatar
      ? { public_id: myCloud.public_id, url: myCloud.secure_url }
      : { public_id: "smapleId", url: "sampleUrl" };

    user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    const token = user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // user.following.push("628bf236159d180d8711b2f5");

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts following followers");

    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMacth = await user.matchPassword(password);

    if (!isMacth) {
      return res.status(400).json({
        success: false,
        message: "Invalid credetnials",
      });
    }

    const token = user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Follow user
exports.followUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexFollowing, 1);
      userToFollow.followers.splice(indexFollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);

      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provied old and new password",
      });
    }

    const isMacth = await user.matchPassword(oldPassword);

    if (!isMacth) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      console.log("theres avatar");
      if (user.avatar.url.includes("http")) {
        console.log("Includes http");
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
      const myCloud = await cloudinary.v2.uploader
        .upload(avatar, {
          folder: "avatars",
        })
        .catch((error) => console.log(error));
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    //REMINDER: AAVATAR TODO

    user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Profile
exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    await user.remove();

    // Logout user after deleting
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    //Delete user posts
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await post.remove();
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }
    // Removing User from  Following's Follower
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Posts
exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "owner comments.user likes"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await (await User.find({})).reverse();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get My Posts
exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "owner comments.user likes"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
