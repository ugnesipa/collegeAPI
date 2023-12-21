// Importing necessary dependencies and components
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../config/api";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import DeleteBtn from "../../components/DeleteBtn";
import EnrolmentCard from "../../components/enrolments/EnrolmentCard";

// Functional component for displaying details of a specific lecturer
const Show = (deleteCallback) => {
  // Retrieving the 'id' parameter from the route
  const { id } = useParams();
  // State variable to store lecturer details
  const [lecturer, setLecturer] = useState(null);

  // Retrieving the user token from local storage
  let token = localStorage.getItem("token");

  // Effect hook to fetch lecturer details on component mount
  useEffect(() => {
    axios
      .get(`/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLecturer(response.data.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data);
      });
  }, [id, token]);

  // Display a message if no lecturer is found
  if (!lecturer) return <h3>No Lecturer</h3>;

  // Function to render enrolments list for the lecturer
  const enrolmentsList = () => {
    if (lecturer.enrolments.length === 0) {
      return (
        <Typography className="text-gray-300 text-lg font-bold mt-5">
          {lecturer.name} has no enrolments
        </Typography>
      );
    }

    return lecturer.enrolments.map((enrolment) => (
      <EnrolmentCard
        key={enrolment.id}
        enrolment={enrolment}
        deleteCallback={deleteCallback}
        title={enrolment.course.title}
      />
    ));
  };

  // Main render section for the Show component
  return (
    <>
      {/* Main content of the lecturer details page */}
      <div className="container">
        <div>
          {/* Heading displaying the name of the lecturer */}
          <Typography className="mdefault text-white text-4xl font-bold mb-10">
            {lecturer.name}
          </Typography>
        </div>
        <div className="shadow-lg flex-auto justify-between py-5 px-5 backdrop-blur-xl rounded-md mt-3 bg-white bg-opacity-10">
          {/* Displaying address, phone number, and email of the lecturer */}
          <Typography className="text-white font-medium mb-3">
            <b>Address:</b> {lecturer.address}
          </Typography>

          <Typography className="text-white font-medium mb-3">
            <b>Phone Number:</b> {lecturer.phone}
          </Typography>
          <Typography className="text-white font-medium">
            <b>Email address:</b> {lecturer.email}
          </Typography>
        </div>
        <div>
          <div className="float-right ">
            {/* Button to navigate to the edit lecturer page */}
            <Link to={`/lecturers/${lecturer.id}/edit`}>
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

            {/* Delete button for the lecturer */}
            <DeleteBtn
              id={lecturer.id}
              resource="lecturers"
              deleteCallback={deleteCallback}
              title={lecturer.name}
            />
          </div>
        </div>
        <div className="">
          {/* Heading for the courses enrolled section */}
          <Typography className=" mt-28 text-white text-2xl font-bold mb-7">
            Courses Enrolled
          </Typography>
        </div>
        {/* Rendering the enrolments list */}
        {enrolmentsList()}
      </div>
    </>
  );
};

// Exporting the Show component
export default Show;