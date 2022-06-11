const { isAuthenticated } = require("../middlewares/auth");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  addComment,
  deleteComment,
} = require("../controllers/post");

const router = require("express").Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router
  .route("/post/comment/:id")
  .put(isAuthenticated, addComment)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
