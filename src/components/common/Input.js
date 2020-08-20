import React from "react";

const Input = ({ name, label, error, type, ...rest }) => {
  const CustomTag = type === "textarea" ? "textarea" : "input";
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <CustomTag
        {...rest}
        name={name}
        id={name}
        className={`form-control ${type === "textarea" && "rounded border"}`}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Input;
