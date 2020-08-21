import axios from "axios";
import React, { useEffect, useState } from "react";
import { array, object, string } from "yup";
import DataTable from "./DataTable";
import AddingForm from "./AddingForm";
import useFormMethods from "../common/useFormMethods";

const RestaurantAdd = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const [restaurantTypes, setRestaurantTypes] = useState([]);

  const [editId, setEditId] = useState("");

  useEffect(() => {
    console.log("Fetch restaurants");
    const url = "/restaurants/all";
    axios.get(url).then((res) => {
      setRestaurantList([...res.data]);
    });
  }, []);

  useEffect(() => {
    console.log("Fetch restaurant types");
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

  const doSubmit = (values) => {
    const url = editId ? `/restaurants/edit/${editId}` : "/restaurants/add";
    //Change the data to match the endPoint
    const valuesClone = { ...values };
    valuesClone.restaurantTypes = valuesClone.restaurantTypes.map((type) => ({
      id: type.value,
      name: type.label,
    }));
    axios.post(url, valuesClone).then((res) => {
      // console.log(res.data);
      !editId && setRestaurantList([...restaurantList, res.data]);
    });
  };

  const initialValues = {
    name: "",
    address: "",
    description: "",
    restaurantTypes: [],
  };
  const [
    handleSubmit,
    renderButton,
    renderInput,
    renderSelect,
    setData,
    setErrors,
  ] = useFormMethods(initialValues, addRestaurantSchema, doSubmit);

  const handleEditClick = (restaurantId) => {
    setEditId(restaurantId);
    const url = `/restaurants/edit/${restaurantId}`;
    axios.get(url).then((res) => {
      console.log("Edit restaurant", res.data);
      setData({
        ...res.data,
        restaurantTypes: res.data.restaurantTypes.map((type) => ({
          value: type.id,
          label: type.name,
        })),
      });
      setErrors({});
    });
  };

  const handleAddClick = () => {
    setEditId("");
    setData(initialValues);
    setErrors({});
  };

  return (
    <div className="row">
      <AddingForm formName="Restaurant info">
        <form onSubmit={handleSubmit}>
          {renderInput("name", "Name", "Name..")}
          {renderInput("address", "Address", "Adress...", "textarea")}
          {renderInput(
            "description",
            "Description",
            "Description...",
            "textarea"
          )}
          {renderSelect("restaurantTypes", "Restaurant Types", restaurantTypes)}
          {renderButton(
            editId ? "Edit" : " Add",
            editId ? "btn-info" : "btn-primary"
          )}
        </form>
      </AddingForm>
      <DataTable
        handleEditClick={handleEditClick}
        handleAddClick={handleAddClick}
        itemList={restaurantList}
      />
    </div>
  );
};

export default RestaurantAdd;
