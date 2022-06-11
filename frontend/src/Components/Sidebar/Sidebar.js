import "./Sidebar.css";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { IoMdColorPalette } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Actions/User";
import ProfileCard from "../ProfileCard/ProfileCard";

const Sidebar = ({ user, active }) => {
  /* STATES */
  const [activeStyle, setActiveStyle] = useState("");
  const [toggle, setToggle] = useState(true);

  const dispatch = useDispatch();
  let root = document.querySelector(":root");

  /* Logout The User From The System */
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  /* Set The "Active" Effect On Selected Button */
  useEffect(() => {
    setActiveStyle(window.location.pathname.split("/")[1]);
  }, []);

  const handleDarkMode = () => {
    setToggle(!toggle);
    if (toggle) {
      root.style.setProperty("--primary-color-hue", "352");
      root.style.setProperty("--dark-color-lightness", "95%");
      root.style.setProperty("--light-color-lightness", "20%");
      root.style.setProperty("--white-color-lightness", "15%");
    } else {
      root.style.setProperty("--primary-color-hue", "252");
      root.style.setProperty("--dark-color-lightness", "17%");
      root.style.setProperty("--light-color-lightness", "95%");
      root.style.setProperty("--white-color-lightness", "100%");
    }
  };

  return (
    <div className="sidebarContainer">
      <ProfileCard user={user} active={active} />
      <div className="sidebar">
        <Link to="/">
          <div
            className={activeStyle === "" ? "menuItem active" : "menuItem"}
            onClick={() => setActiveStyle("")}
          >
            <span>
              <div className="icon">
                <AiOutlineHome />
              </div>
            </span>
            <h3>Home</h3>
          </div>
        </Link>
        <Link to={`/profile/${user?._id}`}>
          <div
            className={
              activeStyle === "profile" ? "menuItem active" : "menuItem"
            }
            onClick={() => setActiveStyle("profile")}
          >
            <span>
              <div className="icon">
                <AiOutlineUser />
              </div>
            </span>
            <h3>Profile</h3>
          </div>
        </Link>
        <div className="menuItem">
          <span onClick={handleDarkMode}>
            <div className="icon hidden">
              <IoMdColorPalette />
            </div>
          </span>
          <div
            id="toggle"
            className={toggle && "toggleActive"}
            onClick={handleDarkMode}
          >
            <i className="indicator"></i>
          </div>
        </div>
        <Link to="/settings">
          <div
            className={
              activeStyle === "settings" ? "menuItem active" : "menuItem"
            }
            onClick={() => setActiveStyle("settings")}
          >
            <span>
              <div className="icon">
                <FiSettings />
              </div>
            </span>
            <h3>Settings</h3>
          </div>
        </Link>
        <Link to="/">
          <div className="menuItem" onClick={logoutHandler}>
            <span>
              <div className="icon">
                <GiExitDoor />
              </div>
            </span>
            <h3>Logout</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
