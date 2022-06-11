const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    console.log("here");
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };
    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    await user.save();

    res.status(201).json({
      success: true,
      post,
      message: "New post created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthaorized",
      });
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Like and Dislike a post
exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Following Posts
exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");
    // console.log(posts);
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

// Add a Comments
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });

    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.params.id);
    console.log("body ", req.body);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }

    if (req.body.commentId == undefined) {
      return res.status(400).json({
        success: false,
        message: "commentId is required",
      });
    }
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        console.log("This is the user");
        if (item._id.toString() === req.body.commentId.toString()) {
          console.log("This is the comment id");
          return post.comments.splice(index, 1);
        }
      } else {
        return;
      }
    });
    await post.save();
    return res.status(200).json({
      success: true,
      message: " Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
