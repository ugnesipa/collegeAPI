// Importing necessary modules and components
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Functional component for the navigation bar
const Mynav = (props) => {
  // State to manage the visibility of the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hook for navigating to different routes
  const navigate = useNavigate();

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Variables for rendering logout button and navigation links
  let logoutButton;
  let navLinks;

  // Function to handle logout
  const handleClick = () => {
    props.onAuthenticated(false);
    navigate("/");
  };

  // Rendering logic based on authentication status
  if (props.authenticated) {
    // JSX for the logout button
    logoutButton = (
      <Button onClick={handleClick} variant="text" color="white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </Button>
    );

    // JSX for navigation links
    navLinks = (
      <>
        <div
          className={`lg:flex lg:items-center ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Button
            variant="text"
            className="text-white hover:bg-white/10 active:bg-white/10 font-normal normal-case text-md"
          >
            <Link to="/enrolments">Enrolments</Link>
          </Button>
          <Button
            variant="text"
            className="text-white hover:bg-white/10 active:bg-white/10 font-normal normal-case text-md"
          >
            <Link to="/courses">Courses</Link>
          </Button>
          <Button
            variant="text"
            className="text-white hover:bg-white/10 active:bg-white/10 font-normal normal-case text-md"
          >
            <Link to="/lecturers">Lecturers</Link>
          </Button>
          {logoutButton}
        </div>
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width={1.5}
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12M6 6h16M6 6H4.75A2.25 2.25 0 002.5 8.25v7.5A2.25 2.25 0 004.75 18H6m16-12v7.5a2.25 2.25 0 01-2.25 2.25H4.75A2.25 2.25 0 012 13.5V6a2.25 2.25 0 012.25-2.25H6"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </>
    );
  }

  // JSX for the navigation bar
  return (
    <nav className="shadow-lg bg-white backdrop-blur-xl bg-opacity-10 p-4 fixed top-0 w-full z-10">
      <div className="flex items-center justify-between">
        {/* Website Icon and Name */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#a1a1aa"
                className="w-6 h-6"
              >
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
            </div>
            <div
              className={`text-white font-bold text-xl ${
                isMenuOpen ? "hidden lg:block" : ""
              }`}
            >
              College API
            </div>
          </div>
        </Link>

        {/* Navigation Links (visible on larger screens) */}
        {navLinks}
      </div>
    </nav>
  );
};

// Exporting the Mynav component as the default export
export default Mynav;