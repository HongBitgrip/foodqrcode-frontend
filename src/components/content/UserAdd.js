import React from "react";
import FormOuter from "./FormOuter";

const UserAdd = () => {
  const inputElements = [
    { name: "name" },
    { name: "email" },
    { name: "address" },
    { name: "phone" },
    { name: "password", type: "password" },
  ];
  return (
    <div></div>
    // <FormOuter
    //   url={"/users/add"}
    //   buttonName={"Login"}
    //   inputElements={inputElements}
    //   formName={"Sign Up"}
    // />
  );
};

export default UserAdd;
