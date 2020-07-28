import React, { useEffect, useState } from "react";
import AddingForm from "./AddingForm";
import axios from "axios";

const AdminAdd = () => {
  const [restaurant, setRestaurant] = useState([]);
  const getAllRestaurantsUrl = "/restaurants/all";

  useEffect(() => {
    axios.get(getAllRestaurantsUrl).then((res) => {
      // console.log(res);
      setRestaurant(
        res.data.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
        }))
      );
    });
  }, []);
  const inputElements = [
    { name: "email" },
    {
      name: "restaurant.id",
      type: "select",
      select: {
        multiple: false,
        options: restaurant,
      },
    },
    { name: "password", type: "password" },
  ];
  return (
    <AddingForm
      url={"/restaurant_admins/add"}
      buttonName={"Add"}
      inputElements={inputElements}
      formName={"Restaurant admin add"}
    />
  );
};

export default AdminAdd;
