import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
                <div className="col-md-6 pr-1">
                  <div className="form-group d-block">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      ref={register({ required: true })}
                      className="form-control"
                      placeholder="Email"
                    />
                    <p className="text-danger">
                      {errors.email && "Email is required"}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 pl-1">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      ref={register({ required: true })}
                      className="form-control"
                      placeholder="Password"
                    />

                    <p className="text-danger">
                      {errors.password && "Password is required"}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 pl-1 align-content-center">
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Login"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
