// Importing necessary dependencies and components
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/api";
import { Button, Input, Typography } from "@material-tailwind/react";
import PageNotFound from "../PageNotFound";
import SuccessDialog from "../../components/SuccessDialog"; // Import the SuccessDialog component

// Functional component for editing a lecturer's information
const Edit = (props) => {
  // State variables for form data, lecturer information, errors, and dialog visibility
  const [form, setForm] = useState({});
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog

  let token = localStorage.getItem("token");

  // Effect hook to fetch lecturer information on component mount
  useEffect(() => {
    axios
      .get(`/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setLecturer(response.data.data);
        setForm(response.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  }, [id, token]);

  // Redirect to 404 page if lecturer information is not available
  if (!lecturer) return <PageNotFound />;

  // Handler function to update form data based on input changes
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to submit the form and update lecturer information
  const submitForm = () => {
    let token = localStorage.getItem("token");

    axios
      .put(`/lecturers/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        openDialog(); // Open dialog on successful form submission
      })
      .catch((err) => {
        console.log(err.response.data);
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

  // Main render section for the lecturer edit page
  return (
    <>
      {/* Main content of the lecturer edit page */}
      <div className="container">
        <div>
          {/* Heading for the lecturer edit page */}
          <Typography className="mdefault text-white text-4xl font-bold mb-10">
            Edit {lecturer.name}
          </Typography>
        </div>
        {/* Container for the form and input fields */}
        <div className="my-card">
          <div className="max-w-4xl mx-auto my-3">
            <div className="px-5 mb-10">
              {/* Input field for lecturer name */}
              <Input
                variant="outlined"
                value={form.name}
                color="white"
                className=" outline-1 outline-white outline-none"
                label="Name"
                name="name"
                onChange={handleForm}
                error={!!errors.name}
              />
              <Typography className="errorStyle my-3 font-normal text-xs">
                {errors.name}
              </Typography>
            </div>
            <div className="px-5 mb-10 ">
              {/* Input field for lecturer address */}
              <Input
                variant="outlined"
                value={form.address}
                color="white"
                className=" outline-1 outline-white outline-none"
                label="Address"
                name="address"
                onChange={handleForm}
                error={!!errors.address}
              />
              <Typography className="errorStyle my-3 font-normal text-xs">
                {errors.address}
              </Typography>
            </div>
            <div className="grid grid-cols-1 px-5 gap-x-10 gap-y-8 md:grid-cols-9">
              <div className="md:col-span-3">
                {/* Input field for lecturer phone number */}
                <Input
                  variant="outlined"
                  value={form.phone}
                  color="white"
                  className=" outline-1 outline-white outline-none"
                  label="Phone"
                  name="phone"
                  onChange={handleForm}
                  maxLength={11}
                  error={!!errors.phone}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.phone}
                </Typography>
              </div>
              <div className="md:col-span-3">
                {/* Input field for lecturer email */}
                <Input
                  variant="outlined"
                  value={form.email}
                  color="white"
                  className=" outline-1 outline-white outline-none"
                  label="Email"
                  name="email"
                  onChange={handleForm}
                  error={!!errors.email}
                  type="email"
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.email}
                </Typography>
              </div>
            </div>
            {/* Button to apply changes to the lecturer information */}
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
      {/* Success dialog to display on successful edit */}
      <SuccessDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        resource={`lecturers/${id}`}
        title={form.name}
        action="edited"
      />
    </>
  );
};

// Exporting the Edit component
export default Edit;