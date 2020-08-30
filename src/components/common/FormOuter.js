import React from "react";

const FormOuter = ({ formName, children }) => {
  return (
    <div className="col-md-6">
      <div className="pt-1 pl-1">
        <div>
          <h5 className="title">{formName}</h5>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default FormOuter;
