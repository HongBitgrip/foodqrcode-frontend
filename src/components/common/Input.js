import React from "react";
import { ErrorMessage } from "./ErrorMessage";

const Input = ({ name, label, error, type, register, ...rest }) => {
  const CustomTag = type === "textarea" ? "textarea" : "input";
  const isCheckBox = type === "checkbox" || type === "radio";
  const labelTag = (
    <label htmlFor={name} className={isCheckBox ? "ml-1 align-middle" : ""}>
      {label}
    </label>
  );
  const input = (
    <CustomTag
      {...rest}
      type={type !== "textarea" ? type : null}
      ref={register}
      name={name}
      className={`${!isCheckBox && "form-control"} ${
        type === "textarea" && "rounded border"
      }`}
    />
  );

  let first = labelTag;
  let second = input;

  if (isCheckBox) {
    first = input;
    second = labelTag;
  }

  return (
    <div className="form-group">
      {first}
      {second}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default Input;
