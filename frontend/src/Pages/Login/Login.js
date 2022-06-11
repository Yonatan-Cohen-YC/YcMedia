import { useAlert } from "react-alert";
import { useState } from "react";
import LoginImage from "../../img/login.svg";
import RegisterImage from "../../img/register.svg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/User";
import useForm from "../../Hooks/useForm";
import "./Login.css";

const Login = () => {
  const [signUpForm, setSignUpForm] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleOnClick = () => {
    setSignUpForm(!signUpForm);
  };

  const submitHandler = (e) => {
    dispatch(loginUser({ email: values.email, password: values.password }));
    alert.success("Login Successful");
  };

  const handleRegister = (e) => {
    console.log(registerValues);
  };

  const { handleSubmit, handleChange, values, errors } = useForm(submitHandler);
  const {
    handleSubmit: registerSubmit,
    handleChange: registerOnChange,
    values: registerValues,
    errors: registerErrors,
  } = useForm(handleRegister);
  return (
    <div
      className={signUpForm ? " loginContainer sign-up-mode" : "loginContainer"}
    >
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="inputContainer">
              <input
                type="text"
                name="email"
                onChange={(e) => handleChange(e)}
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="email" className="formLabel">
                Email
              </label>
            </div>
            {errors.email && (
              <small className="errorMessage">{errors.email}</small>
            )}
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="email" className="formLabel">
                Password
              </label>
            </div>
            {errors.password && (
              <small className="errorMessage">{errors.password}</small>
            )}
            <input type="submit" value="Login" className="butn solid" />

            {/* Register */}
          </form>
          <form onSubmit={registerSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="inputContainer">
              <input
                type="text"
                name="name"
                onChange={(e) => registerOnChange(e)}
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="name" className="formLabel">
                Name
              </label>
            </div>
            {registerErrors.name && (
              <small className="errorMessage">{registerErrors.name}</small>
            )}
            <div className="inputContainer">
              <input
                type="text"
                name="email"
                onChange={(e) => registerOnChange(e)}
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="email" className="formLabel">
                Email
              </label>
            </div>
            {registerErrors.email && (
              <small className="errorMessage">{registerErrors.email}</small>
            )}
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                onChange={(e) => registerOnChange(e)}
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="password" className="formLabel">
                Password
              </label>
            </div>
            {registerErrors.password && (
              <small className="errorMessage">{registerErrors.password}</small>
            )}
            <input type="submit" className="butn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              onClick={handleOnClick}
              className="butn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src={LoginImage} className="img" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={handleOnClick}
              className="butn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={RegisterImage} className="img" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
