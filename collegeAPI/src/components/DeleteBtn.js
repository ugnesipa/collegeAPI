// Importing necessary modules and components
import axios from "../config/api";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "./SuccessDialog"; // Import the SuccessDialog component

// Functional component for a delete button
const DeleteBtn = ({ id, deleteCallback, resource, title }) => {
  // Hook for navigating to different routes
  const navigate = useNavigate();
  // State to manage the visibility of the success dialog
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Function to handle the delete action
  const onDelete = () => {
    // Retrieve the user token from local storage
    let token = localStorage.getItem("token");

    // Send a DELETE request to the API endpoint
    axios
      .delete(`/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log("Deletion successful");
        openDialog(); // Open dialog on successful form submission
      })
      .catch((err) => {
        deleteCallback(id);
        console.log("Error in deletion");
        console.error(err);
        console.log(err.response.data);
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

  // Return JSX for the delete button and success dialog
  return (
    <>
      {/* Button for triggering the delete action */}
      <Button
        onClick={onDelete}
        variant="text"
        className="hover:bg-white/10 active:bg-white/10"
      >
        {/* Trash icon */}
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </Button>
      
      {/* SuccessDialog component to show success message */}
      <SuccessDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        resource={resource}
        title={title}
        action="deleted"
      />
    </>
  );
};

// Exporting the DeleteBtn component as the default export
export default DeleteBtn;