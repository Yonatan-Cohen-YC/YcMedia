import DefaultAvatar from "../../img/defaultAvatar.png";
import "./Profile.css";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  followingPosts,
  getUserPosts,
  getUserProfile,
  loadUser,
} from "../../Actions/User";
import Loader from "../../Components/Loader/Loader";
import Post from "../../Components/Post/Post";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Profile = () => {
  const alert = useAlert();
  /* REDUX TOOLS */
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.userProfile);
  const { user } = useSelector((state) => state.profile);
  const { error, message } = useSelector((state) => state.like);
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getUserPosts(id));
    dispatch(getUserProfile(id));
    dispatch(loadUser(id));
    dispatch(followingPosts());
    if (error) {
      alert.error(error.message);
      dispatch({ type: "ClearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "ClearMessages" });
    }
  }, [error, message, id, alert, dispatch]);

  return isLoading ? (
    <div className="profileLoader">
      <Loader />
    </div>
  ) : (
    <div className="profileContainer">
      <div className="left">
        <div className="ledtSideSideBar">
          <Sidebar user={user} active={true} />
        </div>
      </div>
      <div className="right">
        <div className="userProfile">
          <div className="upSide">
            <div className="profileImage">
              <img
                src={
                  user?.avatar.url.includes("http")
                    ? user?.avatar.url
                    : DefaultAvatar
                }
                alt=""
              />
            </div>
            <div className="userName">{user?.name}</div>
          </div>
          <div className="downSide">
            <div className="followStatus">
              <hr />
              <div className="follow">
                <span>Following</span>
                <span>{user?.following.length}</span>
              </div>
              <hr />
              <div className="follow">
                <span>Followers</span>
                <span>{user?.followers.length}</span>
              </div>
            </div>
            <button className="followButton">Follow</button>
          </div>
        </div>
        <div className="profilePosts">
          {posts?.map((post, key) => (
            <div className="boxOx">
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                createdAt={post.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
