import "./AddPost.css";
import DefaultAvatar from "../../img/defaultAvatar.png";
import { useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Actions/Post";

// Add a new post form component
const AddPost = () => {
  /* STATES */
  const [formToogle, setFormToogle] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  /* REDUX TOOLS */
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading: newLoading } = useSelector((state) => state.like);

  /* Set Image Info Base64  */
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

  /* Submit The Form And Dispatch The Action */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewPost(caption, image));
    setImage(null);
    setCaption("");
  };
  return (
    <form className="addPostContainer" onSubmit={handleSubmit}>
      <div className="newPostHeader" onClick={() => setFormToogle(!formToogle)}>
        <div className="newPostIcon">
          <BiMessageAdd />
        </div>
        <h2>Add a new post</h2>
      </div>
      {formToogle && (
        <div className="formInputs">
          <div className="formInput">
            <div className="profileImage">
              <img
                src={
                  user?.avatar.url.includes("http")
                    ? user.avatar.url
                    : DefaultAvatar
                }
                alt=""
              />{" "}
            </div>
            <input
              type="text"
              placeholder="Whats on your mind?.."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
          </div>
          <div className="formInput">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button className="addPostButton" type="submit" disabled={newLoading}>
            Add Post
          </button>
        </div>
      )}
    </form>
  );
};

export default AddPost;
