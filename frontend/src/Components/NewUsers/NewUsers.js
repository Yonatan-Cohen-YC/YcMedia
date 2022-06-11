import "./NewUsers.css";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import DefaultAvatar from "../../img/defaultAvatar.png";

const NewUsers = ({ userName, userId, userAvatar }) => {
  return (
    <div className="userscontainer">
      <div className="newUserContainer">
        <div className="profileImage">
          <img
            src={userAvatar.includes("http") ? userAvatar : DefaultAvatar}
            alt=""
          />
        </div>
        <div className="userName">
          <Link to={`/profile/${userId}`}>
            <span>{userName}</span>
          </Link>
        </div>
        <div className="follow">
          <IoMdPersonAdd />
          <Link style={{ fontWeight: "bold" }} to={`/profile/${userId}`}>
            <span>Visit</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewUsers;
