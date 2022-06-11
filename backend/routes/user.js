const { isAuthenticated } = require("../middlewares/auth");

const {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  getMyProfile,
  getUserProfile,
  getAllUsers,
  getMyPosts,
  getUserPosts,
} = require("../controllers/user");

const router = require("express").Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/profile").delete(isAuthenticated, deleteMyProfile);

router.route("/profile").get(isAuthenticated, getMyProfile);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/user/posts/:id").get(isAuthenticated, getUserPosts);

router.route("/users").get(isAuthenticated, getAllUsers);

module.exports = router;
