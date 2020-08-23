import React, { useState } from "react";
import { reach } from "yup";

import Input from "./Input";
import CustomSelect from "./CustomSelect";

export default function useFormMethods(initialValues, schema, doSubmit) {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    try {
      schema.validateSync(data, options);
      return null;
    } catch (err) {
      const errors = {};
      for (let item of err.inner) errors[item.path] = item.message;
      return errors;
    }
  };

  const validateProperty = (input) => {
    const { name, value } = input;
    try {
      reach(schema, name).validateSync(value);
      return null;
    } catch (err) {
      return err.message;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors({ ...errors });
    if (errors) {
      return;
    }

    console.log("handle submit", data);
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
      <div className="col-md-6 pl-1 align-content-center mx-auto">
        <div className="form-group">
          <button className={`btn btn-block ${appendClass} mt-4`}>
            {label}
          </button>
        </div>
      </div>
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
