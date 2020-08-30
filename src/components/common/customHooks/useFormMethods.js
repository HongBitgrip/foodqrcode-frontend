import React from "react";
import { yupResolver } from "@hookform/resolvers";

import Input from "../Input";
import CustomSelect from "../CustomSelect";
import { Controller, useForm } from "react-hook-form";

export default function useFormMethods(initialValues, schema = null) {
  const { register, errors, handleSubmit, setValue, reset, control } = useForm({
    resolver: schema && yupResolver(schema),
  });


  function renderButton(text, appendClass) {
    return (
      <div className="col-md-6 align-content-center mx-auto">
        <div className="form-group">
          <input
            type="submit"
            className={`btn btn-block ${appendClass} mt-4`}
            value={text}
          />
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
        label={label}
        register={register}
        error={errors[name]?.message}
        defaultValue={initialValues[name]}
      />
    );
  }

  function renderSelect(name, label, options, isMulti = true) {
    return (
      <Controller
        as={<CustomSelect />}
        name={name}
        control={control}
        options={options}
        label={label}
        error={errors[name]?.message}
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        defaultValue={initialValues[name]}
      />
    );
  }

  return {
    renderButton,
    renderInput,
    renderSelect,
    handleSubmit,
    setValue,
    reset,
    register,
  };
}
