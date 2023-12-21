// Importing React, Link, DeleteBtn, Button, Input, and Typography from Material Tailwind React
import { Link } from "react-router-dom";
import DeleteBtn from "../DeleteBtn";
import { Button, Input, Typography } from "@material-tailwind/react";

// Functional component representing a card for displaying lecturer information
const LecturerCard = ({ lecturer, authenticated, deleteCallback }) => {
  // Return JSX for rendering the lecturer card
  return (
    <li className="flex shadow-md justify-between gap-x-6 py-5 px-5 backdrop-blur-sm rounded-md my-3 bg-white bg-opacity-10">
      {/* Container for lecturer details */}
      <div className="flex min-w-0 gap-x-4 my-auto">
        {/* SVG icon representing a lecturer */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-12 h-12 my-auto"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>

        {/* Container for lecturer information */}
        <div className="flex-auto min-w-0 max-w-3xl">
          {/* Typography component displaying lecturer name as a link */}
          <Typography className="text-white font-bold mb-2">
            <Link to={`/lecturers/${lecturer.id}`}>{lecturer.name}</Link>
          </Typography>

          {/* Typography component displaying lecturer email */}
          <Typography className="text-white">{lecturer.email}</Typography>
        </div>
      </div>

      {/* Container for action buttons (edit and delete) */}
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        {/* Link to edit lecturer details */}
        <Link to={`/lecturers/${lecturer.id}/edit`}>
          {/* Button for editing lecturer details */}
          <Button
            variant="text"
            className="hover:bg-white/10 active:bg-white/10"
          >
            {/* Edit icon */}
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

        {/* DeleteBtn component for deleting lecturer */}
        <DeleteBtn
          id={lecturer.id}
          resource="lecturers"
          deleteCallback={deleteCallback}
          title={lecturer.name}
        />
      </div>
    </li>
  );
};

// Exporting the LecturerCard component as the default export
export default LecturerCard;