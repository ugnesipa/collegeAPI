// Importing useState hook from React
import { useState } from "react";
// Importing Material Tailwind React components for styling
import { Input, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
// Importing date formatting function from date-fns library
import { format } from "date-fns";
// Importing DayPicker component for date selection
import { DayPicker } from "react-day-picker";

// Functional component representing a custom date picker
const MyDatePicker = ({ name, handleForm, value, error }) => {
  // State variable for managing selected date
  const [date, setDate] = useState("");

  // Function to handle date selection and update the form
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : "";
    handleForm({ target: { name, value: formattedDate } });
  };

  // Return JSX for rendering the date picker
  return (
    <div className="  ">
      {/* Popover component for displaying the date picker */}
      <Popover placement="bottom">
        {/* PopoverHandler component containing the input field */}
        <PopoverHandler>
          <Input
            color="white"
            onChange={() => null}
            // Displaying label or default message based on the selected date
            label={!date ? value : "Select Date"}
            className="outline-1 outline-white"
            // Displaying formatted date or empty string
            value={date ? format(date, "yyyy-MM-dd") : ""}
            error={error}
          />
        </PopoverHandler>
        
        {/* PopoverContent component containing the DayPicker component */}
        <PopoverContent>
          {/* DayPicker component for selecting a single date */}
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            showOutsideDays
            className="border-0"
            // Custom styling classes for DayPicker component
            classNames={{
              caption: "flex justify-center py-2 mb-4 relative items-center",
              caption_label: "text-sm font-medium text-gray-900",
              nav: "flex items-center",
              nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
              nav_button_previous: "absolute left-1.5 text-blue-700",
              nav_button_next: "absolute right-1.5 text-blue-700",
              table: "w-full border-collapse",
              head_row: "flex font-medium text-gray-900",
              head_cell: "m-0.5 w-9 font-normal text-sm",
              row: "flex w-full mt-2",
              cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal",
              day_range_end: "day-range-end",
              day_selected: "rounded-md bg-blue-700 text-white hover:bg-gray-900 hover:text-white focus:bg-blue-700 focus:text-white ",
              day_today: "rounded-md bg-gray-200 text-gray-900",
              day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
              day_disabled: "text-gray-500 opacity-50",
              day_hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Exporting the MyDatePicker component as the default export
export default MyDatePicker;