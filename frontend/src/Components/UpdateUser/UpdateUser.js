import "./UpdateUser.css";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUserProfile } from "../../Actions/User";
import DefaultAvatar from "../../img/defaultAvatar.png";

const UpdateUser = () => {
  /* REDUX TOOLS */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  /* Initial State Of Logged User */
  const initialState = {
    name: user?.name,
    email: user?.email,
  };

  /* States */
  const [profile, updateProfile] = useState(initialState);
  const [image, setImage] = useState(null);

  /* Updating The State */
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    updateProfile({ ...profile, [name]: value });
  };

  /* Submitting The Form And Resetting The State */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        name: profile.name,
        email: profile.email,
        avatar: image,
      })
    );
    dispatch(loadUser());
    setImage(null);
    updateProfile(initialState);
    navigate("/");
  };

  /* Get The Current Logged User */
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.onloadend = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  return (
    <div className="updateUserContainer">
      <div className="closeButton">
        <Link to="/">
          <AiOutlineClose />
        </Link>
      </div>
      <form className="updateUserForm" onSubmit={handleSubmit}>
        <div className="updateUserHeader">
          <h2>Update Your Profile</h2>
          <div className="imageInput">
            {/* <div className="inputWrap"> */}
            <div className="profileImage">
              {image && <img src={image} alt="" />}
              {!image && (
                <img
                  src={
                    user?.avatar.url.includes("http")
                      ? user?.avatar.url
                      : DefaultAvatar
                  }
                  alt=""
                />
              )}
            </div>
            <input
              type="file"
              name="avatar"
              placeholder=" "
              accept="image/*"
              onChange={handleImageChange}
              // className="inputField"
            />
          </div>
          <div className="inputWrap">
            <input
              type="text"
              name="name"
              placeholder=" "
              className="inputField"
              onChange={(e) => handleOnChange(e)}
              value={profile.name}
            />
            <label className="formLabel">Name</label>
          </div>
          <div className="inputWrap">
            <input
              type="text"
              name="email"
              placeholder=" "
              className="inputField"
              onChange={(e) => handleOnChange(e)}
              value={profile.email}
            />
            <label className="formLabel">Email</label>
          </div>
          <input
            type="submit"
            value="Update Profile"
            className="updateButton"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
