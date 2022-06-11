import { useState } from "react";
import { omit } from "lodash";

const useForm = (callback) => {
  const regex = /^([a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;
  // Form values
  const [values, setValues] = useState({});
  // Form errors
  const [errors, setErrors] = useState({});

  // Input validate function
  const validate = (event, name, value) => {
    switch (name) {
      case "name":
        if (value.length === 0) {
          setErrors({ ...errors, name: "Name is required" });
        } else {
          // Remove value from the object and returns a new one
          let newObj = omit(errors, "name");
          setErrors(newObj);
        }
        break;
      case "email":
        if (value.length === 0) {
          setErrors({ ...errors, email: "Email is required" });
        } else if (regex.test(value) === false) {
          setErrors({ ...errors, email: "Please enter a valid email" });
        } else {
          // Remove value from the object and returns a new one
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;
      case "password":
        if (value.length === 0) {
          setErrors({ ...errors, password: "Password is required" });
        } else {
          // Remove value from the object and returns a new one
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  // A method to handle from inputs
  const handleChange = (event) => {
    // To stop default events
    event.persist();

    let name = event.target.name;
    let value = event.target.value;

    validate(event, name, value);

    //Save values in the state
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.email.length === 0 || values.password.length === 0) {
      alert("Please fill the form");
      return;
    }
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      return;
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
