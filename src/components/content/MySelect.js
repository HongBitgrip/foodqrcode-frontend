import React from "react";
import Select from "react-select";

const MySelect = ({ selectName, options, value, onChange, onBlur, multi }) => {
  const handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    onChange(selectName, value);
  };

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    onBlur(selectName, true);
  };

  return (
    <Select
      id="select"
      name={selectName}
      closeMenuOnSelect={false}
      options={options}
      isMulti={multi}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
    />
  );
};

export default MySelect;
