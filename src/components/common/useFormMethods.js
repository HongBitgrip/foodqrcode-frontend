import React, { useEffect, useState } from "react";
import { reach } from "yup";

import Input from "./Input";
import CustomSelect from "./CustomSelect";

export default function useFormMethods(initialValues, schema, doSubmit) {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    // const { error } = Joi.validate(data, schema, options);
    let error;
    schema.validate(data, options).catch((err) => {
      console.log("Form error", err);
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = (input) => {
    console.log("Input", input);
    const { name, value } = input;
    let error = null;
    try {
      reach(schema, name).validateSync(value);
      return error;
    } catch (err) {
      return err.message;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors({ errors: errors || {} });
    if (errors) return;

    doSubmit(data);
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);

    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    const newData = { ...data };
    newData[input.name] = input.value;

    setData(newData);
    setErrors(newErrors);
  };

  function renderButton(label) {
    return (
      <button disabled={errors} className="btn btn-primary">
        {label}
      </button>
    );
  }

  function renderInput(name, label, type = "text") {
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  }

  function renderSelect(name, label, options) {
    return (
      <CustomSelect
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  }

  return [handleSubmit, handleChange, renderButton, renderInput, renderSelect];
}
