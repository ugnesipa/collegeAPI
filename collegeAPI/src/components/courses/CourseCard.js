// Importing Material Tailwind React components for styling
import { Button, Input, Typography } from "@material-tailwind/react";
// Importing React Router Link component
import { Link } from "react-router-dom";
// Importing a custom DeleteBtn component
import DeleteBtn from "../DeleteBtn";

// Functional component representing a course card
const CourseCard = ({ course, deleteCallback }) => {
  // Return JSX for rendering the course card
  return (
    // List item with styling classes
    <li className="shadow-md mb-3 flex justify-between py-5 px-5 backdrop-blur-sm rounded-md bg-white bg-opacity-10">
      {/* Link to the detailed course page */}
      <Link to={`/courses/${course.id}`}>
        {/* Container for course information */}
        <div className="flex-auto min-w-0 max-w-3xl my-auto ms-3">
          {/* Course title */}
          <Typography className="text-white font-bold mb-2">
            {course.title}
          </Typography>
          {/* Course description */}
          <Typography className="text-white">{course.description}</Typography>
        </div>
      </Link>

      {/* Container for edit and delete buttons (visible on larger screens) */}
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        {/* Link to the edit course page */}
        <Link to={`/courses/${course.id}/edit`}>
          {/* Edit button with an SVG icon */}
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
              {/* Edit icon path */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Button>
        </Link>

        {/* Custom DeleteBtn component for deleting a course */}
        <DeleteBtn
          id={course.id}
          resource="courses"
          deleteCallback={deleteCallback}
          title={course.title}
        />
      </div>
    </li>
  );
};

// Exporting the CourseCard component as the default export
export default CourseCard;