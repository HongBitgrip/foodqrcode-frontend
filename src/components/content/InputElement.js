import React, { useContext, useEffect } from "react";
import { startCase, capitalize } from "lodash";
import { observer } from "mobx-react";
import { StoreContext } from "../../index";

/**
 *
 * @param register react-hook-form register
 * @param errors react-hook-form-errors
 * @param name input element name
 * @param type input element type, default is text, textarea for textarea, select for select tags
 * @param value input value
 * @param select: in case of select tag, pass an object with properties are multiple, and options array with id,
 * name properties
 * @returns {*}
 * @constructor
 */
const InputElement = observer(
  ({
    register,
    errors,
    name,
    type = "text",
    defaultValue,
    select = undefined,
  }) => {
    const capitalizedName = capitalize(startCase(name));
    const tagNameMap = {
      textarea: "textarea",
      select: "select",
    };
    const CustomTag = tagNameMap[type] || "input";
    return (
      <div className="col-md-12 pr-1">
        <div className="form-group d-block">
          <label>{capitalizedName}</label>
          <CustomTag
            type={type}
            name={name}
            ref={register({ required: true })}
            className={`form-control ${
              (type === "textarea" || type === "select") && "rounded border"
            }`}
            placeholder={capitalizedName}
            defaultValue={defaultValue}
            multiple={select && select.multiple}
          >
            {select &&
              select.options.map((option) => {
                const selected = select.selected;
                return (
                  <option
                    key={option.id}
                    value={option.id}
                    selected={
                      selected && selected.some((rt) => rt.id === option.id)
                    }
                  >
                    {option.name}
                  </option>
                );
              })}
          </CustomTag>
          <p className="text-danger">
            {errors[name] && `${capitalizedName} is required`}
          </p>
        </div>
      </div>
    );
  }
);

export default InputElement;
