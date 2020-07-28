import React from "react";
import AddingForm from "./AddingForm";

const UserAdd = () => {
  const inputElements = [
    { name: "name" },
    { name: "email" },
    { name: "address" },
    { name: "phone" },
    { name: "password", type: "password" },
  ];
  return (
    <AddingForm
      url={"/users/add"}
      buttonName={"Login"}
      inputElements={inputElements}
      formName={"Sign Up"}
    />
  );
};

export default UserAdd;
