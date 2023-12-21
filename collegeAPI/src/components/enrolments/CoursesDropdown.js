// Importing necessary React hooks and components from Material Tailwind
import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Menu, MenuItem } from "@material-tailwind/react";

// Functional component representing a dropdown for selecting courses
const CourseDropdown = ({
  name,
  selected,
  courses,
  handleForm,
  value,
  error,
}) => {
  // State variables for managing dropdown state and search term
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(selected);
  
  // Reference for the button to handle click outside the dropdown
  const buttonRef = useRef(null);

  // Filtering courses based on the search term
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Function to handle course selection
  const handleCourseSelection = (courseId) => {
    const selectedCourse = courses.find((course) => course.id === courseId);
    setSelectedCourse(courseId);
    handleForm({ target: { name, value: courseId } });
    setIsOpen(false);
  };

  // Adding and removing event listener for handling click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Return JSX for rendering the course dropdown
  return (
    <div ref={buttonRef} className="relative">
      {/* Input component serving as the dropdown trigger */}
      <Input
        variant="outlined"
        color="white"
        onClick={toggleDropdown}
        ripple="light"
        className="bord-white-900 rounded-md px-4 py-2 text-white w-full outline-1"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        // Displaying selected course title or default message if none selected
        label={
          selectedCourse
            ? courses.find((course) => course.id === selectedCourse).title
            : value
            ? value
            : "Select a course"
        }
        error={error}
      ></Input>
      
      {/* Menu component displaying the list of courses (visible when dropdown is open) */}
      {isOpen && (
        <Menu
          isOpen={isOpen}
          onClickOutside={() => setIsOpen(false)}
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          <div className="max-h-56 overflow-scroll mt-2">
            {/* Mapping through filtered courses to create menu items */}
            {filteredCourses.map((course) => (
              <MenuItem
                key={course.id}
                color="white"
                ripple="light"
                // Handling click on a course item
                onClick={() => handleCourseSelection(course.id)}
                className="cursor-pointer rounded-none px-3 py-2 hover:bg-gray-100 hover:text-blue-700 text-white bg-white bg-opacity-20 text-sm"
              >
                {course.title}
              </MenuItem>
            ))}
          </div>
        </Menu>
      )}
    </div>
  );
};

// Exporting the CourseDropdown component as the default export
export default CourseDropdown;