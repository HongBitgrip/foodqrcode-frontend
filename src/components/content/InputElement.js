import React from "react";
import { capitalize } from "lodash";

/**
 *
 * @param register react-hook-form register
 * @param errors react-hook-form-errors
 * @param name input element name
 * @param type input element type, default is text, textarea for textarea, select for select tags
 * @param select: in case of select tag, pass an object with properties are multiple, and options array with id,
 * name properties
 * @returns {*}
 * @constructor
 */
const InputElement = ({
  register,
  errors,
  name,
  type = "text",
  select = undefined,
}) => {
  const capitalizedName = capitalize(name);
  const tagNameMap = {
    textarea: "textarea",
    select: "select",
  };
  const CustomTag = tagNameMap[type] || "input";
  return (
    <div className="col-md-6 pr-1">
      <div className="form-group d-block">
        <label>{capitalizedName}</label>
        <CustomTag
          type={type}
          name={name}
          ref={register({ required: true })}
          className={`form-control ${type === "textarea" && "rounded border"}`}
          placeholder={capitalizedName}
          multiple={select && select.multiple}
        >
          {select &&
            select.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
        </CustomTag>
        <p className="text-danger">
          {errors[name] && `${capitalizedName} is required`}
        </p>
      </div>
    </div>
  );
};

export default InputElement;
