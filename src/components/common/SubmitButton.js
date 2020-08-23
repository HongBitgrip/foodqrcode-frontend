import React from "react";

const SubmitButton = ({ buttonName, buttonClass }) => {
  return (
    <div className="col-md-6 pl-1 align-content-center mx-auto">
      <div className="form-group">
        <button type="Submit" className={"btn btn-block " + buttonClass}>
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default SubmitButton;
