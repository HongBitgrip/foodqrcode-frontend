import React from "react";
import AddingForm from "./AddingForm";

const AdminAdd = () => {
  const inputElements = [
    { name: "email" },
    { name: "password", type: "password" },
  ];
  return (
    <div></div>
    // <AddingForm
    //   url={"/admins/add"}
    //   buttonName={"Add"}
    //   inputElements={inputElements}
    //   formName={"Admin add"}
    // />
  );
};

export default AdminAdd;
