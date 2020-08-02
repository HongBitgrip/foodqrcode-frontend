import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import AddingForm from "./AddingForm";
import DataTable from "./DataTable";
import { StoreContext } from "../../index";
import { observer } from "mobx-react";

const RestaurantAdd = observer(() => {
  const store = useContext(StoreContext);
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
        url={"/restaurants/add"}
        buttonName={"Add"}
        inputElements={store.restaurantState.inputElements}
        formName={"Restaurant info"}
        storePushMethod={store.restaurantState.addRestaurant}
      />
      <DataTable />
    </div>
  );
});

export default RestaurantAdd;
