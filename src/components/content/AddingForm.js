import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputElement from "./InputElement";
import SubmitButton from "./SubmitButton";

const AddingForm = ({ url, inputElements = [], buttonName, formName }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    if (data.restaurantTypes) {
      data.restaurantTypes = data.restaurantTypes.map((id) => ({ id }));
    }
    console.log(data);
    axios.post(url, data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h5 className="title">{formName}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {inputElements.map((element) => (
                  <InputElement
                    key={element.name}
                    register={register}
                    errors={errors}
                    name={element.name}
                    type={element.type}
                    select={element.select}
                  />
                ))}
                <SubmitButton buttonName={buttonName} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingForm;
