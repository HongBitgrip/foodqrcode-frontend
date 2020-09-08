import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const PasswordResetFrame = ({ password }) => {
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(password);
  };
  return (
    <div>
      <label>Password</label>
      <div className="rounded border px-2 py-3">
        <div className="text-info justify-content-center">
          {password || "New password will show here"}
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
