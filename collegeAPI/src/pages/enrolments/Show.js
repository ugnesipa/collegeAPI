// Importing necessary dependencies and components
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../config/api";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";
import StatusBox from "../../components/enrolments/StatusBox";

// Functional component for displaying details of a specific enrolment
const Show = (deleteCallback) => {
  // Extracting 'id' from the route parameters
  const { id } = useParams();
  // State variable to hold enrolment data
  const [enrolment, setEnrolment] = useState(null);

  // Retrieving the user token from local storage
  let token = localStorage.getItem("token");

  // Effect to fetch enrolment details when the component mounts or 'id' changes
  useEffect(() => {
    axios
      .get(`/enrolments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEnrolment(response.data.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data);
      });
  }, [id, token]);

  // Display a message if no enrolment is available
  if (!enrolment) return <h3>No Enrolment</h3>;

  // Main render section for the enrolment details page
  return (
    <>
      {/* Main content of the enrolment details page */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div>
          {/* Heading for the enrolment details page */}
          <Typography className="mdefault text-white text-4xl font-bold mb-10">
            Enrolment {enrolment.id}
          </Typography>
        </div>

        {/* Enrolment details section */}
        <div className="flex-auto justify-between py-5 px-5 backdrop-blur-xl rounded-md mt-3 bg-white bg-opacity-10">
          {/* Component to display enrolment status */}
          <StatusBox status={enrolment.status} />

          {/* Links to view details of associated lecturer and course */}
          <Link to={`/lecturers/${enrolment.lecturer_id}`}>
            <Typography className="text-white font-medium mb-3">
              <b>Lecturer:</b> {enrolment.lecturer.name}
            </Typography>
          </Link>
          <Link to={`/courses/${enrolment.course_id}`}>
            <Typography className="text-white font-medium mb-3">
              <b>Course:</b> {enrolment.course.title}
            </Typography>
          </Link>

          {/* Displaying enrolment date and time */}
          <Typography className="text-white font-medium">
            <b>Date:</b> {enrolment.date}
          </Typography>
          <Typography className="text-white font-medium">
            <b>Time:</b> {enrolment.time}
          </Typography>
        </div>

        {/* Buttons for editing and deleting the enrolment */}
        <div>
          <div className="float-right">
            {/* Link to the enrolment edit page */}
            <Link to={`/enrolments/${enrolment.id}/edit`}>
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

            {/* Delete button for the enrolment */}
            <DeleteBtn
              id={enrolment.id}
              resource="enrolments"
              deleteCallback={deleteCallback}
              title={enrolment.name}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Exporting the Show component
export default Show;