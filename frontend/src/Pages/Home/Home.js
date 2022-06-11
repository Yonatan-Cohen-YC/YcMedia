import { useEffect } from "react";
import Components from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { followingPosts, getAllUsers, getMyPosts } from "../../Actions/User";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { myPosts } = useSelector((state) => state.myPosts);
  const { posts } = useSelector((state) => state.followingPosts);
  const { users } = useSelector((state) => state.allUsers);
  const { errors: likeError, message: likeMessage } = useSelector(
    (state) => state.like
  );

  useEffect(() => {
    dispatch(followingPosts());
    dispatch(getAllUsers());
    dispatch(getMyPosts());
  }, [dispatch, likeError, likeMessage]);

  useEffect(() => {
    if (likeError) {
      alert.error(likeMessage);
      dispatch({ type: "ClearErrors" });
    }
    if (likeMessage) {
      alert.success(likeMessage);
      dispatch({ type: "ClearMessages" });
    }
  }, [alert, likeError, likeMessage, dispatch]);

  return (
    <div className="homeContainer container">
      <div className="left">
        <Components.Sidebar user={user} active={false} />
      </div>
      <div className="middle">
        <Components.Feed posts={posts} myPosts={myPosts} />
      </div>
      <div className="right">
        <Components.RightSide users={users} />
      </div>
    </div>
  );
};

export default Home;
