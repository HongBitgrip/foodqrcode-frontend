import React from "react";

const Input = ({ name, label, error, type, register, ...rest }) => {
  const CustomTag = type === "textarea" ? "textarea" : "input";
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <CustomTag
        {...rest}
        type={type !== "textarea" && type}
        ref={register}
        name={name}
        className={`form-control ${type === "textarea" && "rounded border"}`}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Input;
