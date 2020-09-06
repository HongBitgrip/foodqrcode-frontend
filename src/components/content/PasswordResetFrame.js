import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const PasswordResetFrame = ({ password = "New password will show here" }) => {
  const copyToClipBoard = () => {
    console.log(password);
  };
  return (
    <div>
      <label>Password</label>
      <div className="rounded border px-2 py-3">
        <div className="text-info justify-content-center">
          {password}
          <IconButton
            size="small"
            className="float-right"
            onClick={copyToClipBoard}
          >
            <FileCopyIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetFrame;
