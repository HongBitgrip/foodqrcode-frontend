import React from "react";
import Select from "react-select";

const CustomSelect = ({ name, label, options, error, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select
        {...rest}
        id={name}
        name={name}
        closeMenuOnSelect={false}
        onChange={onChange}
        options={options}
        isMulti={true}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default CustomSelect;
