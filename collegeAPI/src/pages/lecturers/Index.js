// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import axios from "../../config/api";
import LecturerCard from "../../components/lecturers/LecturerCard";
import { Typography, Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// Functional component for the Lecturers index page
const Index = (props) => {
  // State variables for the list of lecturers, search query, and user token
  const [lecturers, setLecturers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  let token = localStorage.getItem("token");

  // Effect hook to fetch the list of lecturers on component mount
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

  // Display a message if there are no lecturers
  if (!lecturers) return <h3>There are no lecturers</h3>;

  // Callback function to delete a lecturer and update the list
  const deleteCallback = (id) => {
    let updatedLecturers = lecturers.filter((lecturer) => {
      return lecturer.id !== id;
    });

    setLecturers(updatedLecturers);
  };

  // Filter lecturers based on the search query
  const filteredLecturers = lecturers.filter((lecturer) =>
    lecturer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Map the filtered lecturers to LecturerCard components
  const lecturersList = filteredLecturers.map((lecturer) => {
    return (
      <LecturerCard
        key={lecturer.id}
        lecturer={lecturer}
        authenticated={props.authenticated}
        deleteCallback={deleteCallback}
      />
    );
  });

  // Main render section for the Lecturers index page
  return (
    <>
      {/* Main content of the Lecturers index page */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="flex justify-between">
          <div>
            {/* Heading for the Lecturers index page */}
            <Typography className="mdefault text-white text-4xl font-bold mb-6">
              Lecturers
            </Typography>
          </div>
          <div className="mdefault mb-4"></div>
          <div>
            {/* Button to navigate to the create lecturer page */}
            <Link to="/lecturers/create">
              <Button
                className="shadow-md mdefault sm:items-end"
                variant="outlined"
                color="white"
              >
                <Typography className="text-white font-bold">Create</Typography>
              </Button>
            </Link>
          </div>
        </div>
        <div className="my-10 ">
          {/* Input field for searching lecturers by name */}
          <Input
            variant="outlined"
            type="text"
            color="white"
            label="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow-md outline-1 outline-white "
          />
        </div>
        {/* List of LecturerCard components */}
        <ul>{lecturersList}</ul>
      </div>
    </>
  );
};

// Exporting the Index component
export default Index;