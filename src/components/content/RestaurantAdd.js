import axios from "axios";
import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import Joi from "joi-browser";
import { Field, Form, withFormik } from "formik";
import { object, string, array } from "yup";
import DataTable from "./DataTable";
import AddingForm from "./AddingForm";
import SubmitButton from "./SubmitButton";
import InputWrapper from "./InputWrapper";
import MySelect from "./MySelect";
import useFormMethods from "../common/useFormMethods";

export const editRestaurantState = atom({
  key: "editRestaurantState",
  default: {},
});
export const restaurantListState = atom({
  key: "restaurantListState",
  default: [],
});
export const restaurantTypesState = atom({
  key: "restaurantTypesState",
  default: [],
});
export const isEditState = atom({
  key: "isEditState",
  default: false,
});

const RestaurantAdd = () => {
  const [editRestaurant, setEditRestaurant] = useRecoilState(
    editRestaurantState
  );

  const [restaurantList, setRestaurantList] = useRecoilState(
    restaurantListState
  );

  const [restaurantTypes, setRestaurantTypes] = useRecoilState(
    restaurantTypesState
  );

  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    const url = "/restaurants/all";
    axios.get(url).then((res) => {
      setRestaurantList([...res.data]);
    });
  }, []);

  useEffect(() => {
    const getAllRestaurantTypesUrl = "/restaurant_types/all";
    axios.get(getAllRestaurantTypesUrl).then((res) => {
      const typeData = res.data.map((type) => ({
        value: type.id,
        label: type.name,
      }));
      setRestaurantTypes([...typeData]);
    });
  }, []);

  const addRestaurantSchema = object({
    name: string().required("Name is required"),
    address: string().required("Address is required"),
    description: string().required("Description is required"),
    restaurantTypes: array()
      .ensure()
      .min(1, "Pick at least 1 type")
      .of(
        object().shape({
          label: string().required(),
          value: string().required(),
        })
      ),
  });

  const initialValues = {
    name: "",
    address: "",
    description: "",
    restaurantTypes: [],
  };

  const doSubmit = (values) => {
    const url = isEdit
      ? `/restaurants/edit/${editRestaurant.id}`
      : "/restaurants/add";
    //Change the data to match the endPoint
    const valuesClone = { ...values };
    valuesClone.restaurantTypes = valuesClone.restaurantTypes.map((type) => ({
      id: type.value,
      name: type.label,
    }));
    axios.post(url, valuesClone).then((res) => {
      // console.log(res.data);
      !isEdit && setRestaurantList([...restaurantList, res.data]);
    });
  };

  const [
    handleSubmit,
    handleChange,
    renderButton,
    renderInput,
    renderSelect,
  ] = useFormMethods(initialValues, addRestaurantSchema, doSubmit);

  const handleEditClick = (restaurantId) => {
    setIsEdit(true);
    const url = `/restaurants/edit/${restaurantId}`;
    axios.get(url).then((res) => {
      console.log("Edit restaurant", res.data);
      setEditRestaurant({
        ...res.data,
        restaurantTypes: res.data.restaurantTypes.map((type) => ({
          value: type.id,
          label: type.name,
        })),
      });
    });
  };

  const handleAddClick = () => {
    setIsEdit(false);
  };

  return (
    <div className="row">
      <AddingForm formName="Restaurant info">
        <form onSubmit={handleSubmit}>
          {renderInput("name", "Name")}
          {renderInput("address", "Address", "textarea")}
          {renderInput("description", "Description", "textarea")}
          {renderSelect("restaurantTypes", "Restaurant Types", restaurantTypes)}
          {renderButton(isEdit ? "Edit" : " Add")}
        </form>
      </AddingForm>
      <DataTable
        handleEditClick={handleEditClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
};

export default RestaurantAdd;
