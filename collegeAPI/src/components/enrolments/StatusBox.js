// Importing React and Material Tailwind React components for styling
import React from 'react';
import { Button, Typography } from "@material-tailwind/react";

// Functional component representing a status box
const StatusBox = ({ status }) => {
  // Function to determine the background color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "interested":
        return "#60a5fa"; // Tailwind CSS class for 'interested'
      case "associate":
        return "#fdba74"; // Tailwind CSS class for 'associate'
      case "assigned":
        return "#10b981"; // Tailwind CSS class for 'assigned'
      case "career_break":
        return "#f87171"; // Tailwind CSS class for 'career_break'
      default:
        return "gray-500"; // Default class (you can change this)
    }
  };

  // Return JSX for rendering the status box
  return (
    <div
      className="shadow w-52 rounded-md text-center flex justify-center items-center mb-3 mt-2"
      style={{
        backgroundColor: getStatusColor(status),
      }}
    >
      {/* Typography component displaying the uppercase status */}
      <Typography className="text-white font-medium text-sm py-1">
        {status.toUpperCase()}
      </Typography>
    </div>
  );
};

// Exporting the StatusBox component as the default export
export default StatusBox;