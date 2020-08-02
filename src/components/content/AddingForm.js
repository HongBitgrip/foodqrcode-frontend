import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputElement from "./InputElement";
import SubmitButton from "./SubmitButton";
import { observer } from "mobx-react";
import { StoreContext } from "../../index";

const AddingForm = observer(
  ({
    url,
    inputElements = [],
    buttonName,
    buttonClass,
    formName,
    storePushMethod,
  }) => {
    const store = useContext(StoreContext);
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
      store.restaurantState.formReset = reset;
    });
    const onSubmit = (data) => {
      // console.log("before change", data);
      if (data.restaurantTypes) {
        data.restaurantTypes = data.restaurantTypes.map((id) => ({ id }));
      }
      console.log("submit data", data);
      axios.post(url, data).then((res) => {
        console.log("response data", res.data);
        storePushMethod(res.data);
      });
    };

    return (
      <div className="col-md-6">
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
                    defaultValue={element.defaultValue}
                  />
                ))}
                <SubmitButton
                  buttonClass={buttonClass}
                  buttonName={buttonName}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
);
export default AddingForm;
