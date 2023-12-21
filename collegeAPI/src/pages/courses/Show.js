// Importing necessary dependencies and components
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../config/api";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";
import EnrolmentCard from "../../components/enrolments/EnrolmentCard";

// Functional component representing the course details page
const Show = (deleteCallback) => {
  // Extracting 'id' from the URL parameters
  const { id } = useParams();
  // State variable for storing course details
  const [course, setCourse] = useState(null);

  // Retrieving token from localStorage
  let token = localStorage.getItem("token");

  // Effect to fetch course details when the component mounts or 'id' and 'token' change
  useEffect(() => {
    axios
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCourse(response.data.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data);
      });
  }, [id, token]);

  // If no course is found, display a message
  if (!course) return <h3>No Course</h3>;

  // Function to generate a list of enrolment cards for the course
  const enrolmentsList = () => {
    if (course.enrolments.length === 0) {
      return (
        <Typography className="text-gray-300 text-lg font-bold mt-5">
          {course.title} has no enrolments
        </Typography>
      );
    }

    return course.enrolments.map((enrolment) => (
      <EnrolmentCard
        key={enrolment.id}
        enrolment={enrolment}
        deleteCallback={deleteCallback}
        name={enrolment.lecturer.name}
      />
    ));
  };

  // Main render section for the course details page
  return (
    <>
      {/* Main content of the course details page */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8v ">
        <div className="">
          {/* Course title section */}
          <Typography className="mdefault text-white text-4xl font-bold mb-10">
            {course.title}
          </Typography>
        </div>
        {/* Course details section */}
        <div className="flex-auto justify-between py-5 px-5 backdrop-blur-xl rounded-md mt-3 bg-white bg-opacity-10">
          <Typography className="text-white mb-3">
            {course.description}
          </Typography>

          <Typography className="text-white font-medium">
            <b>Code: </b> {course.code}
          </Typography>
          <Typography className="text-white font-medium">
            <b>Points: </b> {course.points}
          </Typography>
          <Typography className="text-white font-medium">
            <b>Level: </b> {course.level}
          </Typography>
        </div>
        {/* Action buttons section */}
        <div className="mt-3">
          <div className="float-right">
            {/* Button to navigate to the course edit page */}
            <Link to={`/courses/${course.id}/edit`}>
              <Button
                variant="text"
                className="hover:bg-white/10 active:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Button>
            </Link>

            {/* Component for handling course deletion */}
            <DeleteBtn
              id={course.id}
              resource="courses"
              deleteCallback={deleteCallback}
              title={course.title}
            />
          </div>
        </div>
        {/* Enrolled lecturers section */}
        <div className="">
          <Typography className=" mt-28 text-white text-2xl font-bold mb-7">
            Enrolled Lecturers
          </Typography>
        </div>
        {/* Rendering the list of enrolment cards */}
        {enrolmentsList()}
      </div>
    </>
  );
};

export default Show;