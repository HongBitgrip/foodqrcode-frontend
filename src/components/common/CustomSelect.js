import React from "react";
import Select from "react-select";

const CustomSelect = ({ name, label, options, error, onChange, ...rest }) => {
  const handleChange = (value) => {
    //Change the argument for the onChange method of useFormMethods
    onChange({ currentTarget: { name: name, value: value } });
  };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select
        {...rest}
        id={name}
        name={name}
        closeMenuOnSelect={false}
        onChange={handleChange}
        options={options}
        isMulti={true}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default CustomSelect;
