// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import axios from "../../config/api";
import EnrolmentCard from "../../components/enrolments/EnrolmentCard";
import { Typography, Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// Functional component for displaying a list of enrolments
const Index = (props) => {
  // State variables for enrolments data, search query, and user token
  const [enrolments, setEnrolments] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  let token = localStorage.getItem("token");

  // Effect to fetch enrolments when the component mounts or 'token' changes
  useEffect(() => {
    axios
      .get("/enrolments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEnrolments(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // Display a message if no enrolments are available
  if (!enrolments) return <h3>There are no enrolments</h3>;

  // Callback function to delete an enrolment
  const deleteCallback = (id) => {
    let updatedEnrolments = enrolments.filter((enrolment) => {
      return enrolment.id !== id;
    });

    setEnrolments(updatedEnrolments);
  };

  // Filter enrolments based on search query
  const filteredEnrolments = enrolments.filter(
    (enrolment) =>
      enrolment.lecturer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      enrolment.course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      enrolment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrolment.id.toString().includes(searchQuery)
  );

  // Prepare the list of enrolments for rendering
  let enrolmentsList;
  if (filteredEnrolments.length === 0) {
    enrolmentsList = (
      <Typography className="text-white font-medium">
        Enrolment not found
      </Typography>
    );
  } else {
    enrolmentsList = filteredEnrolments.map((enrolment) => (
      <EnrolmentCard
        key={enrolment.id}
        enrolment={enrolment}
        deleteCallback={deleteCallback}
        name={enrolment.lecturer.name}
        title={enrolment.course.title}
      />
    ));
  }

  // Main render section for the enrolments index page
  return (
    <>
      {/* Main content of the enrolments index page */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="flex justify-between">
          {/* Heading for the enrolments index page */}
          <div>
            <Typography className=" mdefault text-white text-4xl font-bold mb-6">
              Enrolments
            </Typography>
          </div>
          {/* Button to navigate to the create enrolment page */}
          <div>
            <Link to="/enrolments/create">
              <Button
                className="shadow-md mdefault sm:items-end hover:bg-white hover:bg-opacity-10"
                variant="outlined"
                color="white"
              >
                <Typography className="text-white font-bold">Create</Typography>
              </Button>
            </Link>
          </div>
        </div>
        {/* Search input section */}
        <div className="my-10">
          <Input
            variant="outlined"
            type="text"
            color="white"
            label="Search by id, lecturer name, course title, or status"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow-md outline-1 outline-white "
          />
        </div>
        {/* Rendered list of enrolments */}
        <ul>{enrolmentsList}</ul>
      </div>
    </>
  );
};

// Exporting the Index component
export default Index;