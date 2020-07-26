import React, { useEffect, useState } from "react";
import axios from "axios";

import AddingForm from "./AddingForm";

const RestaurantAdd = () => {
  const [restaurantTypes, setRestaurantTypes] = useState([]);
  const getAllRestaurantTypesUrl = "/restaurant_types/all";

  useEffect(() => {
    axios.get(getAllRestaurantTypesUrl).then((res) => {
      // console.log(res);
      setRestaurantTypes(
        res.data.map((type) => ({ id: type.id, name: type.name }))
      );
    });
  }, []);
  const inputElements = [
    { name: "name" },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "restaurantTypes",
      type: "select",
      select: {
        multiple: true,
        options: restaurantTypes,
      },
    },
  ];
  return (
    <AddingForm
      url={"/restaurants/add"}
      buttonName={"Add"}
      inputElements={inputElements}
      formName={"Restaurant add"}
    />
  );
};

export default RestaurantAdd;
