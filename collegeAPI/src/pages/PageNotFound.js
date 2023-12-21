// Importing necessary hooks from react-router-dom and components from Material Tailwind
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@material-tailwind/react";

// Functional component for the 404 Page Not Found
const PageNotFound = () => {
  // Using useLocation to get information about the current URL
  const location = useLocation();
  // Using useNavigate for programmatic navigation
  const navigate = useNavigate();

  // Effect hook to automatically redirect to the home page after 4 seconds
  useEffect(() => {
    // Setting up a timer for redirection
    let timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    // Cleanup function to clear the timer on component unmount
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Main render section for the PageNotFound component
  return (
    <>
      {/* Container div with flex properties for centering */}
      <div className="flex items-center justify-center h-screen -m-6">
        <div className="text-center">
          {/* Displaying a 404 error message and information about the current URL */}
          <Typography className="text-[#059669] text-lg font-semibold mb-5">
            404
          </Typography>
          <Typography className="text-6xl font-semibold text-white mb-5">
            Page Not found
          </Typography>
          <Typography className="text-gray-700 mb-5">
            Sorry, {location.pathname} could not be found
          </Typography>
          <Typography className="text-2xl text-white font-semibold">
            Redirecting you home...
          </Typography>
        </div>
      </div>
    </>
  );
};

// Exporting the PageNotFound component
export default PageNotFound;