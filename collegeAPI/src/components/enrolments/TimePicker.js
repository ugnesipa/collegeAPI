// Importing React and Material Tailwind React components for styling
import React, { useState } from "react";
import { Input, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";

// Functional component representing a custom time picker
const MyTimePicker = ({ name, handleForm, value, error }) => {
  // State variable for managing selected time
  const [time, setTime] = useState("");

  // Function to handle time change and update the form
  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
    handleForm({ target: { name, value: selectedTime } });
  };

  // Return JSX for rendering the time picker
  return (
    <div className=" ">
      {/* Popover component for displaying the time picker */}
      <Popover placement="bottom">
        {/* PopoverHandler component containing the input field */}
        <PopoverHandler>
          <Input
            color="white"
            onChange={() => null}
            // Displaying label or default message based on the selected time
            label={!time ? value : "Select Time"}
            value={time}
            className="outline-1 outline-white"
            error={error}
          />
        </PopoverHandler>
        
        {/* PopoverContent component containing the time input field */}
        <PopoverContent>
          <div className="flex items-center justify-center">
            {/* Input field for selecting a time */}
            <input
              type="time"
              value={time}
              // Handling change in the selected time
              onChange={(e) => handleTimeChange(e.target.value)}
              className="text-xl p-2 border-b-2 border-gray-300 bg-white text-black"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Exporting the MyTimePicker component as the default export
export default MyTimePicker;