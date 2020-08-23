import React from "react";
import FormOuter from "../common/FormOuter";

const AdminAdd = () => {
  const inputElements = [
    { name: "email" },
    { name: "password", type: "password" },
  ];
  return (
    <div></div>
    // <FormOuter
    //   url={"/admins/add"}
    //   buttonName={"Add"}
    //   inputElements={inputElements}
    //   formName={"Admin add"}
    // />
  );
};

export default AdminAdd;
