import "./CommentsBox.css";
import DefaultAvatar from "../../img/defaultAvatar.png";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../Actions/Post";

const CommentsBox = ({ comment, postId }) => {
  /* REDUX TOOLS */
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /* Delete comment function  */
  const handleDeleteComment = () => {
    dispatch(deleteComment(postId, { commentId: comment._id }));
  };
  return (
    <div className="comment">
      <div className="commentLeft">
        <img
          className="profileImage"
          src={
            comment?.user.avatar.url.includes("http")
              ? comment?.user.avatar.url
              : DefaultAvatar
          }
          alt=""
        />
        <div className="commentText">{comment.comment}</div>
      </div>
      <div className="commentDate textMuted">
        {moment(comment.createdAt).fromNow()}
      </div>
      {user?._id === comment.user?._id && (
        <div className="deleteComment" onClick={handleDeleteComment}>
          <AiOutlineDelete />
        </div>
      )}
    </div>
  );
};

export default CommentsBox;
