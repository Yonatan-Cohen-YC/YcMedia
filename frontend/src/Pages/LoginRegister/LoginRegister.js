import "./LoginRegister.css";
import Logo from "../../img/logo.png";
import Img1 from "../../img/image1.png";
import Img2 from "../../img/image2.png";
import Img3 from "../../img/image3.png";
import DefaultAvatar from "../../img/defaultAvatar.png";
import useForm from "../../Hooks/useForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const LoginRegister = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [activeBullet, setActiveBullet] = useState(1);
  const [signUpMode, setSignUpMode] = useState(false);
  const [image, setImage] = useState(null);

  const { error } = useSelector((state) => state.user);

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

  const loginSubmitHandler = (e) => {
    dispatch(
      loginUser({ email: loginValues.email, password: loginValues.password })
    );
  };
  const registerSubmitHandler = (e) => {
    dispatch(
      registerUser({
        name: registerValues.name,
        email: registerValues.email,
        password: registerValues.password,
        avatar: image,
      })
    );
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "ClearErrors" });
    }
  }, [error, alert, dispatch]);

  const {
    handleSubmit: loginSubmit,
    handleChange: handleLoginChange,
    values: loginValues,
    errors: loginErrors,
  } = useForm(loginSubmitHandler);
  const {
    handleSubmit: registerSubmit,
    handleChange: handleRegisterChange,
    values: registerValues,
    errors: registerErrors,
  } = useForm(registerSubmitHandler);
  return (
    <main className={signUpMode ? "signUpMode" : ""}>
      <div className="box">
        <div className="innerBox">
          <div className="formsWrap">
            <form className="loginForm" onSubmit={loginSubmit}>
              <div className="logo">
                <img src={Logo} alt="" />
                <h4>YC Media</h4>
              </div>
              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not register yet?</h6>
                <div
                  onClick={() => setSignUpMode(!signUpMode)}
                  className="toggle"
                >
                  Sign up
                </div>
              </div>
              <div className="actualForm">
                <div className="inputWrap">
                  <input
                    type="text"
                    name="email"
                    placeholder=" "
                    className="inputField"
                    onChange={(e) => handleLoginChange(e)}
                  />
                  <label className="formLabel">Email</label>
                </div>
                {loginErrors.email && (
                  <small className="errorMessage">{loginErrors.email}</small>
                )}
                <div className="inputWrap">
                  <input
                    type="password"
                    name="password"
                    placeholder=" "
                    className="inputField"
                    autoComplete="on"
                    onChange={(e) => handleLoginChange(e)}
                  />
                  <label className="formLabel">Password</label>
                </div>
                {loginErrors.password && (
                  <small className="errorMessage">{loginErrors.password}</small>
                )}
                <input type="submit" value="Login" className="loginButton" />
              </div>
            </form>
            <form className="RegisterForm" onSubmit={registerSubmit}>
              <div className="logo">
                <img src={Logo} alt="" />
                <h4>YC Media</h4>
              </div>
              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <div
                  onClick={() => setSignUpMode(!signUpMode)}
                  className="toggle"
                >
                  Sign in
                </div>
              </div>
              <div className="actualForm">
                <div className="imageInput">
                  {/* <div className="inputWrap"> */}
                  <div className="profileImage">
                    <img src={image ? image : DefaultAvatar} alt="" />
                  </div>
                  <input
                    type="file"
                    name="avatar"
                    placeholder=" "
                    accept="image/*"
                    onChange={handleImageChange}
                    // className="inputField"
                  />
                  <small className="note">(optional)</small>
                </div>
                {/* </div> */}
                <div className="inputWrap">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    className="inputField"
                    onChange={(e) => handleRegisterChange(e)}
                  />
                  <label className="formLabel">Name</label>
                </div>
                {registerErrors.name && (
                  <small className="errorMessage">{registerErrors.name}</small>
                )}
                <div className="inputWrap">
                  <input
                    type="text"
                    name="email"
                    placeholder=" "
                    className="inputField"
                    onChange={(e) => handleRegisterChange(e)}
                  />
                  <label className="formLabel">Email</label>
                </div>
                {registerErrors.email && (
                  <small className="errorMessage">{registerErrors.email}</small>
                )}
                <div className="inputWrap">
                  <input
                    type="password"
                    name="password"
                    placeholder=" "
                    className="inputField"
                    onChange={(e) => handleRegisterChange(e)}
                  />
                  <label className="formLabel">Password</label>
                </div>
                {registerErrors.password && (
                  <small className="errorMessage">
                    {registerErrors.password}
                  </small>
                )}
                <input type="submit" value="Sign up" className="loginButton" />
              </div>
            </form>
          </div>
          <div className="carousel">
            <div className="imagesWrapper">
              <img
                alt=""
                src={Img1}
                className={
                  activeBullet === 1
                    ? "slideImage img-1 show"
                    : "slideImage img-1"
                }
              />
              <img
                alt=""
                src={Img2}
                className={
                  activeBullet === 2
                    ? "slideImage img-2 show"
                    : "slideImage img-2"
                }
              />
              <img
                alt=""
                src={Img3}
                className={
                  activeBullet === 3
                    ? "slideImage img-3 show"
                    : "slideImage img-3"
                }
              />
            </div>
            <div className="textSlider">
              <div className="textWrapper">
                <div
                  className={
                    activeBullet === 2
                      ? "textGroup slideTwice"
                      : activeBullet == 3 && "textGroup slideThrice"
                  }
                >
                  <h2>Share your Images and Thoughts</h2>
                  <h2>Like and comments other users posts</h2>
                  <h2>Follow friends to stay updated</h2>
                </div>
              </div>

              <div className="bullets">
                <span
                  className={activeBullet === 1 ? "isActive" : ""}
                  onClick={() => setActiveBullet(1)}
                ></span>
                <span
                  className={activeBullet === 2 ? "isActive" : ""}
                  onClick={() => setActiveBullet(2)}
                ></span>
                <span
                  className={activeBullet === 3 ? "isActive" : ""}
                  onClick={() => setActiveBullet(3)}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginRegister;
