// Importing necessary React hooks and components from Material Tailwind
import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Menu, MenuItem } from "@material-tailwind/react";

// Functional component representing a dropdown for selecting lecturers
const LecturerDropdown = ({ name, value, lecturers, handleForm, error }) => {
  // State variables for managing dropdown state and search term
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState(value);
  // Reference for the button to handle click outside the dropdown
  const buttonRef = useRef(null);

  // Filtering lecturers based on the search term
  const filteredLecturers = lecturers.filter((lecturer) =>
    lecturer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Function to handle lecturer selection
  const handleLecturerSelection = (lecturerId) => {
    const selectedLecturer = lecturers.find(
      (lecturer) => lecturer.id === lecturerId
    );
    setSelectedLecturer(lecturerId);
    handleForm({ target: { name, value: lecturerId } });
    setIsOpen(false);
  };

  // Adding and removing event listener for handling click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Return JSX for rendering the lecturer dropdown
  return (
    <div ref={buttonRef} className="relative">
      {/* Input component serving as the dropdown trigger */}
      <Input
        variant="outlined"
        type="text"
        color="white"
        onClick={toggleDropdown}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ripple="light"
        className="rounded-md px-4 py-2 text-white w-full outline-1 outline-white"
        // Displaying selected lecturer name or default message if none selected
        label={
          selectedLecturer
            ? lecturers.find((lecturer) => lecturer.id === selectedLecturer)
                .name
            : value ? value : "Select a lecturer"
        }
        error={error}
      ></Input>
      
      {/* Menu component displaying the list of lecturers (visible when dropdown is open) */}
      {isOpen && (
        <Menu
          isOpen={isOpen}
          onClickOutside={() => setIsOpen(false)}
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          <div className="max-h-56 overflow-scroll mt-2">
            {/* Mapping through filtered lecturers to create menu items */}
            {filteredLecturers.map((lecturer) => (
              <MenuItem
                key={lecturer.id}
                color="white"
                ripple="light"
                // Handling click on a lecturer item
                onClick={() => handleLecturerSelection(lecturer.id)}
                className="text-white rounded-none bg-white bg-opacity-20 text-sm cursor-pointer px-3 py-2 hover:bg-gray-100 hover:text-blue-700"
              >
                {lecturer.name}
              </MenuItem>
            ))}
          </div>
        </Menu>
      )}
    </div>
  );
};

// Exporting the LecturerDropdown component as the default export
export default LecturerDropdown;