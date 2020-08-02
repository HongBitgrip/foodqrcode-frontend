import React from "react";

const SubmitButton = ({ buttonName }) => {
  return (
    <div className="col-md-6 pl-1 align-content-center mx-auto">
      <div className="form-group">
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value={buttonName}
        />
      </div>
    </div>
  );
};

export default SubmitButton;
