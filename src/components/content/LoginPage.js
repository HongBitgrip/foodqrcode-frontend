import React from "react";
import AddingForm from "./AddingForm";

const LoginPage = () => {
  const inputElements = [
    { name: "email" },
    { name: "password", type: "password" },
  ];
  return (
    <div></div>
    // <AddingForm
    //   url={"/login"}
    //   buttonName={"Login"}
    //   inputElements={inputElements}
    //   formName={"Login"}
    // />
  );
};

export default LoginPage;
