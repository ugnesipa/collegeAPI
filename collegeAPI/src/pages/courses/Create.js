// Importing necessary modules and components
import React, { useState } from "react";
import axios from "../../config/api";
import { Button, Input, Typography } from "@material-tailwind/react";
import SuccessDialog from "../../components/SuccessDialog"; // Import the SuccessDialog component

// Functional component for the course creation page
const Create = (props) => {
  // State variables for form data, form errors, and dialog state
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog

  // Handler function for form input changes
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to submit the form data
  const submitForm = () => {
    let token = localStorage.getItem("token");
//axios request to submit form data
    axios
      .post("/courses", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        openDialog(); // Open dialog on successful form submission
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  // Function to open the success dialog
  const openDialog = () => {
    setDialogOpen(true);
  };

  // Function to close the success dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {/* Success dialog component */}
      <SuccessDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        resource="courses"
        title={form.title}
        action="created"
      />

      {/* Main content of the course creation page */}
      <div className="container">
        <div>
          <Typography className="mdefault text-white text-4xl font-bold mb-10">
            Create Course
          </Typography>
        </div>
        <div className="my-card">
          <div className="max-w-4xl mx-auto my-3">
            {/* Form input for course title with error message from API (if any) */}
            <div className="px-5 mb-10">
              <Input
                variant="outlined"
                color="white"
                className=" outline-1 outline-white outline-none"
                label="Title"
                name="title"
                onChange={handleForm}
                error={!!errors.title}
              />
              <Typography className="errorStyle my-3 font-normal text-xs">
                {errors.title}
              </Typography>
            </div>

            {/* Form inputs for course description  with error message from API (if any)*/}
            <div className="px-5 mb-10">
              <Input
                variant="outlined"
                color="white"
                className=" outline-1 outline-white outline-none"
                label="Description"
                name="description"
                onChange={handleForm}
                error={!!errors.description}
              />
              <Typography className="errorStyle my-3 font-normal text-xs">
                {errors.description}
              </Typography>
            </div>

            {/* Form inputs for course code, level, and points with error messages from API (if any) */}
            <div className="grid grid-cols-1 px-5 gap-x-10 gap-y-8 md:grid-cols-9">
              <div className="md:col-span-3">
                <Input
                  variant="outlined"
                  color="white"
                  className=" outline-1 outline-white outline-none"
                  label="Code"
                  name="code"
                  onChange={handleForm}
                  maxLength={5}
                  error={!!errors.code}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.code}
                </Typography>
              </div>
              <div className="md:col-span-3">
                <Input
                  variant="outlined"
                  color="white"
                  className=" outline-1 outline-white outline-none"
                  label="Level"
                  name="level"
                  maxLength={9}
                  onChange={handleForm}
                  error={!!errors.level}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.level}
                </Typography>
              </div>
              <div className="md:col-span-3">
                <Input
                  variant="outlined"
                  color="white"
                  className=" outline-1 outline-white outline-none"
                  label="Points"
                  name="points"
                  maxLength={9}
                  onChange={handleForm}
                  error={!!errors.points}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.points}
                </Typography>
              </div>
            </div>

            {/* Button to submit the form */}
            <Button
              variant="filled"
              color="white"
              className="font-bold text-[#a1a1aa] text-sm mt-9 ml-4 hover:bg-white hover:bg-opacity-10"
              onClick={submitForm}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// Exporting the Create component as the default export
export default Create;