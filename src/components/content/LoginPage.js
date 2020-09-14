import React from "react";
import FormOuter from "../common/FormOuter";

const LoginPage = () => {
  const inputElements = [
    { name: "email" },
    { name: "password", type: "password" },
  ];
  return (
    <div></div>
    // <FormOuter
    //   url={"/login"}
    //   buttonName={"Login"}
    //   inputElements={inputElements}
    //   formName={"Login"}
    // />
  );
};

export default LoginPage;
