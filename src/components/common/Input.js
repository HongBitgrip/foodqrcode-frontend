import React from "react";

const Input = ({ name, label, error, type, register, ...rest }) => {
  const CustomTag = type === "textarea" ? "textarea" : "input";
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <CustomTag
        {...rest}
        ref={register}
        name={name}
        id={name}
        className={`form-control ${type === "textarea" && "rounded border"}`}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Input;
