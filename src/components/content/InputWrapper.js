import React from "react";

const InputWrapper = ({ errorMessage, children }) => {
  return (
    <div className="col-md-12 pr-1">
      <div className="form-group d-block">
        {children}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default InputWrapper;
