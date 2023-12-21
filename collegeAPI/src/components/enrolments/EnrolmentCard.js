// Importing Material Tailwind React components for styling
import { Button, Input, Typography } from "@material-tailwind/react";
// Importing React Router Link component
import { Link } from "react-router-dom";
// Importing custom components for handling status and deletion
import DeleteBtn from "../DeleteBtn";
import StatusBox from "./StatusBox";

// Functional component representing an enrolment card
const EnrolmentCard = ({ enrolment, deleteCallback, name, title }) => {
  // Return JSX for rendering the enrolment card
  return (
    // List item with styling classes
    <li className="shadow-md mb-3 flex py-3 px-5 backdrop-blur-sm rounded-md bg-white bg-opacity-10">
      {/* Container for enrolment information */}
      <div className="flex-auto min-w-0 max-w-6xl my-auto mx-3">
        {/* StatusBox component displaying enrolment status */}
        <StatusBox status={enrolment.status} />

        {/* Link to the detailed enrolment page */}
        <Link to={`/enrolments/${enrolment.id}`}>
          {/* Enrolment name */}
          <Typography className="text-white mt-4 font-semibold ">
            {name}
          </Typography>
          {/* Enrolment title */}
          <Typography className="text-white font-semibold mt-2 mb-2">
            {title}
          </Typography>
          {/* Enrolment number */}
          <Typography className="text-white text-sm font-medium ">
            Enrolment no.{enrolment.id}
          </Typography>
        </Link>
      </div>
      
      {/* Container for edit and delete buttons (visible on larger screens) */}
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        {/* Link to the edit enrolment page */}
        <Link to={`/enrolments/${enrolment.id}/edit`}>
          {/* Edit button with an SVG icon */}
          <Button
            variant="text"
            className="hover:bg-white/10 active:bg-white/10 mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6 "
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

        {/* Custom DeleteBtn component for deleting an enrolment */}
        <DeleteBtn
          id={enrolment.id}
          resource="enrolments"
          deleteCallback={deleteCallback}
          title={`enrolment ${enrolment.id}`}
        />
      </div>
    </li>
  );
};

// Exporting the EnrolmentCard component as the default export
export default EnrolmentCard;