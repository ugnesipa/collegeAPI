// Importing necessary modules from React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Importing CSS styles
import "./assets/css/index.css";

// Importing ThemeProvider from @material-tailwind/react
import { ThemeProvider } from "@material-tailwind/react";

// Importing the main App component
import App from "./App";

// Creating a React root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component within a StrictMode for additional development checks
root.render(
  <React.StrictMode>
    {/* Wrapping the App component with ThemeProvider for styling */}
    <App />
  </React.StrictMode>
);