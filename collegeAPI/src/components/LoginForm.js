// Importing necessary modules and components
import axios from "../config/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";

// Functional component for the login form
const LoginForm = (props) => {
  // Hook for navigating to different routes
  const navigate = useNavigate();

  // State to manage form data
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form input changes
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to handle the form submission
  const handleClick = () => {
    console.log("clicked", form);

    // Send a POST request to the login endpoint
    axios
      .post("/login", {
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data.token);
        // setAuthenticated(true);
        props.onAuthenticated(true, response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.error);
        setErrorMessage(err.response.data.error);
      });
  };

  // JSX to render when the user is authenticated
  if (props.authenticated) {
    return (
      <>
        <div className="my-card max-w-screen-md">
          <Typography className="text-[#059669] text-xl font-semibold mb-8">
            This is Home
          </Typography>
          <Typography className="px-7 text-white text-3xl font-semibold">
            Use the above menu to browse College API
          </Typography>
        </div>
      </>
    );
  } else {
    // JSX to render when the user is not authenticated
    return (
      <div className="container">
        <div>
          <Typography className="mdefault mx-auto  text-white text-4xl font-bold mb-10">
            Please Log in
          </Typography>
        </div>
        <div className="my-card">
          <div className="max-w-4xl mx-auto my-3">
            <div className="mb-10 px-5">
              {/* Input for email */}
              <Input
                variant="outlined"
                color="white"
                type="email"
                className="outline-1 outline-white outline-none"
                label="Email"
                name="email"
                onChange={handleForm}
                error={errorMessage.email}
              />
              {/* Error message for email */}
              <Typography className="errorStyle mt-3 font-normal text-xs">
                {errorMessage.email}
              </Typography>
            </div>
            <div className="px-5">
              {/* Input for password */}
              <Input
                variant="outlined"
                color="white"
                type="password"
                className="outline-1 outline-white outline-none"
                label="Password"
                name="password"
                onChange={handleForm}
                error={errorMessage.password}
              />
              {/* Error message for password */}
              <Typography className="errorStyle mt-3 font-normal text-xs">
                {errorMessage.password}
              </Typography>
            </div>
            {/* Submit button */}
            <Button
              variant="filled"
              color="white"
              className="mx-auto font-bold text-[#a1a1aa] text-sm mt-9 hover:bg-white hover:bg-opacity-10"
              onClick={handleClick}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

// Exporting the LoginForm component as the default export
export default LoginForm;