import React from "react";
import SubmitButton from "./SubmitButton";

const FormOuter = ({ formName, children }) => {
  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-header">
          <h5 className="title">{formName}</h5>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};
export default FormOuter;
