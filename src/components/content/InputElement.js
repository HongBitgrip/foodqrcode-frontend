import React from "react";
import { capitalize } from "lodash";

const InputElement = ({ register, errors, name, type = "text" }) => {
  const capitalizedName = capitalize(name);
  return (
    <div className="col-md-6 pr-1">
      <div className="form-group d-block">
        <label>Email</label>
        <input
          type={type}
          name={name}
          ref={register({ required: true })}
          className="form-control"
          placeholder={capitalizedName}
        />
        <p className="text-danger">
          {errors[name] && `${capitalizedName} is required`}
        </p>
      </div>
    </div>
  );
};

export default InputElement;
