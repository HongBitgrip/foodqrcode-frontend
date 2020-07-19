import React from "react";
import AddingForm from "./AddingForm";

const AdminAdd = () => {
  const inputElements = [
    { name: "email" },
    { name: "password", type: "password" },
  ];
  return (
    <AddingForm
      url={"/restaurant_admins/add"}
      buttonName={"Add"}
      inputElements={inputElements}
      formName={"Restaurant admin add"}
    />
  );
};

export default AdminAdd;
