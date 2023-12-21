// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import axios from "../../config/api";
import CourseCard from "../../components/courses/CourseCard";
import { Typography, Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// Functional component representing the course index page
const Index = (props) => {
  // State variables for courses data, search query, and token
  const [courses, setCourses] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  let token = localStorage.getItem("token"); // Retrieving token from localStorage

  // Effect to fetch courses data when the component mounts or 'token' changes
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

  // If no courses are found, display a message
  if (!courses) return <h3>There are no courses</h3>;

  // Callback function to update courses list after deletion
  const deleteCallback = (id) => {
    let updatedCourses = courses.filter((course) => {
      return course.id !== id;
    });

    setCourses(updatedCourses);
  };

  // Filtering courses based on the search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mapping courses to CourseCard components
  const coursesList = filteredCourses.map((course) => {
    return (
      <CourseCard
        key={course.id}
        course={course}
        authenticated={props.authenticated}
        deleteCallback={deleteCallback}
      />
    );
  });

  // Main render section for the course index page
  return (
    <>
      {/* Main content of the course index page */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          {/* Section heading */}
          <div>
            <Typography className="mdefault text-white text-4xl font-bold mb-6">
              Courses
            </Typography>
          </div>
          {/* Button to navigate to the course creation page */}
          <div>
            <Link to="/courses/create">
              <Button
                className="mdefault shadow-md sm:items-end hover:bg-white hover:bg-opacity-10"
                variant="outlined"
                color="white"
              >
                <Typography className="text-white font-bold">Create</Typography>
              </Button>
            </Link>
          </div>
        </div>
        {/* Search input for filtering courses by title */}
        <div className="my-10">
          <Input
            variant="outlined"
            type="text"
            color="white"
            label="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow-md outline-1 outline-white"
          />
        </div>
        {/* List of courses rendered using CourseCard components */}
        <ul>{coursesList}</ul>
      </div>
    </>
  );
};

export default Index;