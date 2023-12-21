// Importing necessary modules and components
import React from "react";
import { Dialog, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// Functional component for the success dialog
const SuccessDialog = ({ isOpen, onClose, resource, title, action }) => {
  return (
    <Dialog open={isOpen} handler={onClose} className="bg-opacity-20 pt-3">
      <DialogBody className="text-white">
        <div className="flex items-center justify-center pt-12">
          <div className="text-center font-extrabold text-2xl">
            {title} {action} successfully!
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        {/* Link to navigate to the specified resource */}
        <Link to={`/${resource}`}>
          {/* Button for closing the dialog */}
          <Button
            variant="filled"
            className="font-bold text-[#8c8c94] text-sm hover:bg-white hover:bg-opacity-10"
            color="white"
            onClick={onClose}
          >
            <span>Close</span>
          </Button>
        </Link>
      </DialogFooter>
    </Dialog>
  );
};

// Exporting the SuccessDialog component as the default export
export default SuccessDialog;