import React, { useState } from "react";
import { reach } from "yup";

import Input from "./Input";
import CustomSelect from "./CustomSelect";

export default function useFormMethods(initialValues, schema, doSubmit) {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const errors = {};
    try {
      schema.validateSync(data, options);
    } catch (err) {
      for (let item of err.inner) errors[item.path] = item.message;
    }
    return errors;
  };

  const validateProperty = (input) => {
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
    console.log(errors);
    setErrors({ ...errors });
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

  function renderButton(label, appendClass) {
    return (
      <button
        onClick={handleSubmit}
        className={`btn btn-block ${appendClass} mt-4`}
      >
        {label}
      </button>
    );
  }

  function renderInput(name, label, placeHolder, type = "text") {
    return (
      <Input
        type={type}
        placeholder={placeHolder}
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

  return [
    handleSubmit,
    renderButton,
    renderInput,
    renderSelect,
    setData,
    setErrors,
  ];
}
