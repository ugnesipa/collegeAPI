// Importing the LoginForm component
import LoginForm from "../components/LoginForm";

// Functional component for the Home page
const Home = (props) => {
  // Main render section for the Home component
  return (
    <>
      {/* Container div with flex properties for centering */}
      <div className="flex items-center justify-center h-screen -m-6">
        <div className="text-center">
          {/* Rendering the LoginForm component */}
          <LoginForm
            authenticated={props.authenticated}
            onAuthenticated={props.onAuthenticated}
          />
        </div>
      </div>
    </>
  );
};

// Exporting the Home component
export default Home;