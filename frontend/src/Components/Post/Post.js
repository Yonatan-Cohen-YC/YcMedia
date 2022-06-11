import moment from "moment";
import DefaultAvatar from "../../img/defaultAvatar.png";
import {
  AiOutlineComment,
  AiOutlineEllipsis,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineSend,
  AiOutlineDelete,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deletePost, likePost } from "../../Actions/Post";
import { followingPosts } from "../../Actions/User";
import CommentsBox from "../CommentsBox/CommentsBox";
import "./Post.css";
// import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const Post = ({
  postId,
  caption,
  postImage,
  likes,
  comments,
  ownerImage,
  ownerName,
  ownerId,
  createdAt,
}) => {
  // STATES
  const [activeLike, setActiveLike] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const [comment, setComment] = useState("");
  const [deletePostButton, setDeletePostButton] = useState(false);
  // REDUX TOOLS
  const { user } = useSelector((state) => state.user);
  // const { isLoading } = useSelector((state) => state.myPosts);
  const dispatch = useDispatch();

  // Active or deactive like button
  const handleLike = () => {
    setActiveLike(!activeLike);

    dispatch(likePost(postId));

    dispatch(followingPosts());
  };

  // Get comment input value
  const getInputValue = (e) => {
    setComment(e.target.value);
  };

  // Add comment
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(postId, { comment }));
    dispatch(followingPosts());
    setComment("");
  };

  // Delete a post
  const deletePostHandler = () => {
    dispatch(deletePost(postId));
    dispatch(followingPosts());
  };
  // Set pre active or deactive like button
  useEffect(() => {
    likes.forEach((item) => {
      if (item?._id === user?._id) {
        setActiveLike(true);
      }
    });
  }, [likes, user?._id]);

  return (
    <div className="post">
      <div className="head">
        <div className="user">
          <div className="profileImage">
            <img
              src={ownerImage?.includes("http") ? ownerImage : DefaultAvatar}
              alt=""
            />{" "}
          </div>
          <div className="info">
            <Link to={`/profile/${ownerId}`}>
              <h3>{ownerName}</h3>
            </Link>
            <small>{moment(createdAt).fromNow()}</small>
          </div>
        </div>
        {user?._id === ownerId && (
          <span
            className="edit"
            onClick={() => setDeletePostButton(!deletePostButton)}
          >
            <AiOutlineEllipsis />
            {deletePostButton && (
              <button className="deletePostButton" onClick={deletePostHandler}>
                Delete <AiOutlineDelete />
              </button>
            )}
          </span>
        )}
      </div>
      <div className="image">
        <img src={postImage} alt="" />
      </div>
      <div className="actionButtons">
        {activeLike ? (
          <span onClick={handleLike}>
            <AiFillHeart />
          </span>
        ) : (
          <span onClick={handleLike}>
            <AiOutlineHeart />
          </span>
        )}
        {/* POST BODY END */}

        <div className="likes">
          <p>
            <b>{likes.length}</b> likes
          </p>
        </div>
        <span>
          <AiOutlineComment />
        </span>
        <div className="likes">
          <p>
            <b>{comments.length}</b> comments
          </p>
        </div>
      </div>
      <div className="caption">
        <p>
          <b>{ownerName}:</b>
          {caption}
        </p>
        {/* POST FOOTER END */}

        {/* NEW COMMENT START */}
        <div className="searchBox marginTopAndBottom">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Add a comment . ."
              name="comment"
              onChange={(e) => getInputValue(e)}
              required
              value={comment}
            />
            <button type="submit" className="addButton">
              <AiOutlineSend />
            </button>
          </form>
        </div>
      </div>
      <div
        className="comments textMuted"
        onClick={() => setToggleComments(!toggleComments)}
      >
        View all comments
      </div>
      {toggleComments && comments.length > 0 ? (
        <div className="commentsContainer">
          {comments.map((comment, key) => (
            <CommentsBox key={key} comment={comment} postId={postId} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
