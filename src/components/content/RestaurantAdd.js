import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AddingForm from "./AddingForm";
import DataTable from "./DataTable";
import { StoreContext } from "../../index";
import { observer } from "mobx-react";

const RestaurantAdd = observer(() => {
  const store = useContext(StoreContext);
  const isEdit = store.restaurantState.isEdit;
  const editRestaurantId =
    store.restaurantState.editRestaurant &&
    store.restaurantState.editRestaurant.id;
  // const { editRestaurant } = store.restaurantState;
  // const [restaurantTypes, setRestaurantTypes] = useState([]);

  useEffect(() => {
    store.restaurantState.fetchRestaurantTypes();
  }, []);
  // const inputElements = [
  //   { name: "name", defaultValue: editRestaurant.name },
  //   {
  //     name: "address",
  //     type: "textarea",
  //     defaultValue: editRestaurant.address,
  //   },
  //   {
  //     name: "description",
  //     type: "textarea",
  //     defaultValue: editRestaurant.description,
  //   },
  //   {
  //     name: "restaurantTypes",
  //     type: "select",
  //     select: {
  //       multiple: true,
  //       options: restaurantTypes,
  //     },
  //   },
  // ];
  return (
    <div className="row">
      <AddingForm
        url={
          isEdit ? `/restaurants/edit/${editRestaurantId}` : "/restaurants/add"
        }
        buttonName={isEdit ? "Edit" : "Add"}
        buttonClass={isEdit ? "btn-info" : "btn-success"}
        inputElements={store.restaurantState.inputElements}
        formName={"Restaurant info"}
        storePushMethod={store.restaurantState.addRestaurant}
      />
      <DataTable />
    </div>
  );
});

export default RestaurantAdd;
