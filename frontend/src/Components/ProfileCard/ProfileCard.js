import "./ProfileCard.css";
import DefaultAvatar from "../../img/defaultAvatar.png";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, loadUser } from "../../Actions/User";

const ProfileCard = ({ user, active }) => {
  /* STATE */
  const [method, setMethod] = useState(false);
  const { user: myUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = window.location.pathname.split("/")[2];

  /* Follow User And Update UI Function */
  const handleFollow = () => {
    dispatch(loadUser(id));
    dispatch(followUser(id));

    dispatch({ type: "ClearErrors" });
    dispatch({ type: "ClearMessages" });
  };

  /* check If User Alreadt Been Followed */
  useEffect(() => {
    const setFollow = async () => {
      await myUser?.following?.forEach((item) => {
        if (item) {
          item?.includes(id) ? setMethod(true) : setMethod(false);
        }
      });
    };
    setFollow();
    dispatch(loadUser(id));
  }, [dispatch, id, myUser?.following]);

  return (
    <div className="profileCard">
      <div className="profileImages">
        <img
          src={
            user?.avatar.url.includes("http") ? user?.avatar.url : DefaultAvatar
          }
          alt=""
        />
      </div>
      <div className="profileName">
        <span>@{user?.name}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>
        </div>
        <hr />
      </div>
      {myUser?._id !== id && (
        <div
          className={active ? "profileFollowButton" : "hideButton"}
          onClick={handleFollow}
        >
          {!method ? (
            <span
              style={{ color: "hsl(252, 75%, 60%)" }}
              onClick={() => setMethod(!method)}
            >
              Follow
            </span>
          ) : (
            <span onClick={() => setMethod(!method)}>Unfollow</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
