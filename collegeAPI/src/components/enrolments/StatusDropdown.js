// Importing React and Material Tailwind React components for styling
import React, { useState, useRef, useEffect } from "react";
import { Input, Menu, MenuItem } from "@material-tailwind/react";

// Functional component representing a status dropdown
const StatusDropdown = ({ name, handleForm, options, value, error }) => {
  // State variables for managing dropdown state and selected status
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Reference for the button to handle click outside the dropdown
  const buttonRef = useRef(null);

  // Function to handle click outside the dropdown
  const handleClickOutside = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle status selection and update the form
  const handleStatusSelection = (statusValue) => {
    setSelectedStatus(statusValue);
    handleForm({ target: { name, value: statusValue } });
    setIsOpen(false);
  };

  // Adding and removing event listener for handling click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Return JSX for rendering the status dropdown
  return (
    <div ref={buttonRef} className="relative">
      {/* Input component serving as the dropdown trigger */}
      <Input
        variant="outlined"
        color="white"
        onClick={toggleDropdown}
        className="text-white w-full outline-1 outline-white font-medium"
        // Displaying label or default message based on the selected status
        label={!selectedStatus ? value : "Select a status"}
        value={selectedStatus}
        error={error}
      />
      
      {/* Menu component displaying the list of status options (visible when dropdown is open) */}
      {isOpen && (
        <Menu
          isOpen={isOpen}
          onClickOutside={() => setIsOpen(false)}
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          {/* Mapping through status options to create menu items */}
          <div className="mb-2 mt-2">
            {options.map((status) => (
              <div
                className="text-white bg-white bg-opacity-20 text-sm"
                key={status}
              >
                {/* MenuItem component for each status option */}
                <MenuItem
                  color="gray"
                  ripple="light"
                  // Handling click on a status item
                  onClick={() => handleStatusSelection(status)}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 hover:text-blue-700"
                >
                  {status}
                </MenuItem>
              </div>
            ))}
          </div>
        </Menu>
      )}
    </div>
  );
};

// Exporting the StatusDropdown component as the default export
export default StatusDropdown;





