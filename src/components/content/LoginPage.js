import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputElement from "./InputElement";
import SubmitButton from "./SubmitButton";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    axios.post(`/login`, data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h5 className="title">Login</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <InputElement
                  register={register}
                  errors={errors}
                  name={"email"}
                />
                <InputElement
                  register={register}
                  errors={errors}
                  name={"password"}
                  type={"password"}
                />
                <SubmitButton buttonName={"Login"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
