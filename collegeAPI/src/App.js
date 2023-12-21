// Importing necessary components and hooks from React and React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Importing pages and components
import Home from "./pages/Home";
import CoursesIndex from "./pages/courses/Index";
import CoursesShow from "./pages/courses/Show";
import CoursesCreate from "./pages/courses/Create";
import CoursesEdit from "./pages/courses/Edit";

import LecturersIndex from "./pages/lecturers/Index";
import LecturersShow from "./pages/lecturers/Show";
import LecturersCreate from "./pages/lecturers/Create";
import LecturersEdit from "./pages/lecturers/Edit";

import EnrolmetsCreate from "./pages/enrolments/Create";
import EnrolmetsIndex from "./pages/enrolments/Index";
import EnrolmetsShow from "./pages/enrolments/Show";
import EnrolmetsEdit from "./pages/enrolments/Edit";

import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import "./assets/css/app.css";

// Main App component
const App = () => {
  // State to manage user authentication status
  const [authenticated, setAuthenticated] = useState(false);
  // Variable to store protected pages based on authentication status
  let protectedPages;

  // Effect hook to check and set authentication status on component mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  // Function to handle authentication status changes
  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);
    // Save token to local storage on authentication, remove on logout
    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  // Conditional rendering of protected pages based on authentication status
  if (authenticated) {
    protectedPages = (
      <>
        {/* Routes for courses */}
        <Route path="/courses" element={<CoursesIndex />} />
        <Route path="/courses/create" element={<CoursesCreate />} />
        <Route path="/courses/:id/edit" element={<CoursesEdit />} />
        <Route path="/courses/:id" element={<CoursesShow />} />

        {/* Routes for lecturers */}
        <Route path="/lecturers" element={<LecturersIndex />} />
        <Route path="/lecturers/create" element={<LecturersCreate />} />
        <Route path="/lecturers/:id/edit" element={<LecturersEdit />} />
        <Route path="/lecturers/:id" element={<LecturersShow />} />

        {/* Routes for enrolments */}
        <Route path="/enrolments" element={<EnrolmetsIndex />} />
        <Route path="/enrolments/create" element={<EnrolmetsCreate />} />
        <Route path="/enrolments/:id/edit" element={<EnrolmetsEdit />} />
        <Route path="/enrolments/:id" element={<EnrolmetsShow />} />
      </>
    );
  }

  // Main render section for the App component
  return (
    <Router>
      {/* Navbar component with authentication status and callback function */}
      <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated} />
      {/* React Router Routes for navigation */}
      <Routes>
        {/* Route for the home page */}
        <Route
          path="/"
          element={
            <Home
              authenticated={authenticated}
              onAuthenticated={onAuthenticated}
            />
          }
        />
        {/* Conditionally rendered protected pages */}
        {protectedPages}
        {/* Default route for any unknown paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

// Exporting the App component
export default App;