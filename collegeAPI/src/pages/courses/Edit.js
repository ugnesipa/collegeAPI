// Importing necessary dependencies and components
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/api";
import { Button, Input, Typography } from "@material-tailwind/react";
import PageNotFound from "../PageNotFound";
import SuccessDialog from "../../components/SuccessDialog"; // Import the SuccessDialog component

// Functional component representing the course editing page
const Edit = (props) => {
  // State variables for form data, course details, form errors, and dialog state
  const [form, setForm] = useState({});
  const { id } = useParams(); // Extracting the 'id' parameter from the route
  const [course, setCourse] = useState(null); // State for storing course details
  const [errors, setErrors] = useState({}); // State for form validation errors
  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog

  let token = localStorage.getItem("token"); // Retrieving token from localStorage

  // Function to submit the form data
  const submitForm = () => {
    axios
      .put(`/courses/${id}`, form, {
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

  // Fetching course details when the component mounts
  useEffect(() => {
    axios
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setCourse(response.data.data);
        setForm(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  }, [id, token]); // Dependency array to re-run effect when 'id' or 'token' changes

  // If no course is found, render the PageNotFound component
  if (!course) return <PageNotFound />;

  // Handler function for form input changes
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to open the success dialog
  const openDialog = () => {
    setDialogOpen(true);
  };

  // Function to close the success dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };

  // Main render section for the course edit page
  return (
    <>
      {/* Main content of the course edit page */}
      <div className="container">
        <div>
          <Typography className="mdefault text-white text-4xl font-bold mb-10">
            Edit {course.title}
          </Typography>
        </div>
        <div className="my-card">
          <div className="max-w-4xl mx-auto my-3">
            {/* Form inputs for course title */}
            <div className="px-5 mb-10">
              <Input
                variant="outlined"
                value={form.title}
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
            {/* Form inputs for course description */}
            <div className="px-5 mb-10 ">
              <Input
                variant="outlined"
                value={form.description}
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
            {/* Form inputs for course code, level, and points */}
            <div className="grid grid-cols-1 px-5 gap-x-10 gap-y-8 md:grid-cols-9">
              <div className="md:col-span-3">
                <Input
                  variant="outlined"
                  value={form.code}
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
                  value={form.level}
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
                  value={form.points}
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
              Apply
            </Button>
          </div>
        </div>
      </div>
      {/* Success dialog component */}
      <SuccessDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        resource={`courses/${id}`}
        title={form.title}
        action="edited"
      />
    </>
  );
};

export default Edit;