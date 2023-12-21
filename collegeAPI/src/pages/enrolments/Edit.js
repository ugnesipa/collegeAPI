// Importing necessary dependencies and components
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { Button, Typography } from "@material-tailwind/react";
import SuccessDialog from "../../components/SuccessDialog";
import CourseDropdown from "../../components/enrolments/CoursesDropdown";
import LecturerDropdown from "../../components/enrolments/LecturersDropdown";
import StatusDropdown from "../../components/enrolments/StatusDropdown";
import DatePicker from "../../components/enrolments/MyDatePicker";
import MyTimePicker from "../../components/enrolments/TimePicker";
import { useParams } from "react-router-dom"; // Import useParams

// Functional component for editing an enrolment
const EditEnrolment = (props) => {
  // State variables for form data, errors, dialog state, enrolments, courses, lecturers, and status options
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [enrolments, setEnrolments] = useState(null);
  const [courses, setCourses] = useState(null);
  const [lecturers, setLecturers] = useState(null);
  const [statusOptions, setStatusOptions] = useState({});

  // Use useParams to access route parameters
  const { id } = useParams();

  // Retrieving token from localStorage
  let token = localStorage.getItem("token");

  // Function to handle form input changes
  const handleForm = (e) => {
    console.log("Target Name:", e.target.name);
    console.log("Target Value:", e.target.value);
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Effect to fetch enrolments and unique status values when the component mounts or 'token' changes
  useEffect(() => {
    axios
      .get("/enrolments", {
        // Use the id from useParams to fetch the specific enrolment
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Extract unique status values from enrolments
        const uniqueStatuses = [
          ...new Set(response.data.data.map((enrolment) => enrolment.status)),
        ];
        setStatusOptions(uniqueStatuses);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // Effect to fetch the specific enrolment based on the id from useParams
  useEffect(() => {
    axios
      .get(`/enrolments/${id}`, {
        // Use the id from useParams to fetch the specific enrolment
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setEnrolments(response.data.data);
        // Set default form values based on the fetched enrolment data
        setForm(response.data.data);
        console.log({ form });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, id]); // Make sure to include id in the dependency array

  // Effect to fetch courses when the component mounts or 'token' changes
  useEffect(() => {
    axios
      .get("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCourses(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // Effect to fetch lecturers when the component mounts or 'token' changes
  useEffect(() => {
    axios
      .get("/lecturers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLecturers(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // Function to submit the enrolment update form
  const submitForm = () => {
    axios
      .put(`/enrolments/${id}`, form, {
        // Use the id from useParams to update the specific enrolment
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

  // Main render section for the enrolment editing page
  return (
    <>
      {/* Main content of the enrolment editing page */}
      <div className="container">
        <div>
          {/* Heading for the enrolment editing page */}
          <Typography className="mdefault text-white text-4xl font-bold mb-10">
            Edit Enrolment
          </Typography>
        </div>
        {/* Enrolment form section */}
        <div className="my-card">
          <div className="max-w-4xl mx-auto my-3">
            {/* Grid layout for form input fields */}
            <div className="grid grid-cols-1 px-5 gap-x-10 gap-y-8 md:grid-cols-12  mb-10">
              {/* Course dropdown section */}
              <div className="md:col-span-6">
                <CourseDropdown
                  name="course_id"
                  selected={form.course_id}
                  courses={courses || []}
                  handleForm={handleForm}
                  value={form.course ? form.course.title : ""}
                  error={!!errors.course_id}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.course_id}
                </Typography>
              </div>
              {/* Lecturer dropdown section */}
              <div className="md:col-span-6">
                <LecturerDropdown
                  name="lecturer_id"
                  value={form.lecturer ? form.lecturer.name : ""}
                  lecturers={lecturers || []}
                  handleForm={handleForm}
                  error={!!errors.lecturer_id}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.lecturer_id}
                </Typography>
              </div>
            </div>
            {/* Grid layout for additional enrolment details */}
            <div className="grid grid-cols-1 px-5 gap-x-10 gap-y-10 md:grid-cols-9">
              {/* Date picker section */}
              <div className="md:col-span-3">
                <DatePicker
                  name="date"
                  handleForm={handleForm}
                  value={form.date}
                  error={!!errors.date}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.date}
                </Typography>
              </div>
              {/* Time picker section */}
              <div className="md:col-span-3">
                <MyTimePicker
                  name="time"
                  value={form.time}
                  handleForm={handleForm}
                  error={!!errors.time}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.time}
                </Typography>
              </div>
              {/* Status dropdown section */}
              <div className="md:col-span-3">
                <StatusDropdown
                  name="status"
                  handleForm={handleForm}
                  options={statusOptions}
                  value={form.status}
                  error={!!errors.status}
                />
                <Typography className="errorStyle my-3 font-normal text-xs">
                  {errors.status}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Button to submit enrolment update */}
        <Button
          variant="filled"
          color="white"
          className="font-bold text-[#a1a1aa] text-sm mt-9 ml-4 hover:bg-white hover:bg-opacity-10"
          onClick={submitForm}
        >
          Update
        </Button>
      </div>
      
      {/* Success dialog for displaying successful enrolment update */}
      <SuccessDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        resource={`enrolments/${id}`}
        title="Enrolment"
        action="updated"
      />
    </>
  );
};

// Exporting the EditEnrolment component
export default EditEnrolment;