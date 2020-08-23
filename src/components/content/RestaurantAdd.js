import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { array, object, string } from "yup";
import DataTable from "../common/DataTable";
import FormOuter from "../common/FormOuter";
import useFormMethods from "../common/useFormMethods";
import MyModal from "../common/MyModal";
import reactModal from "../common/reactModal";
import MyPagination from "../common/MyPagination";

const RestaurantAdd = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const [restaurantTypes, setRestaurantTypes] = useState([]);

  const [editId, setEditId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsCount, setItemsCount] = useState(0);

  const PAGE_SIZE = 10;

  const fetchRestaurant = () => {
    const url = "/restaurants/all";
    axios
      .get(url, { params: { page: currentPage - 1, pageSize: PAGE_SIZE } })
      .then((res) => {
        setRestaurantList(res.data.content);
        setItemsCount(res.data.totalElements);
      });
  };
  useEffect(fetchRestaurant, [currentPage]);

  useEffect(() => {
    const getAllRestaurantTypesUrl = "/restaurant_types/all";
    axios.get(getAllRestaurantTypesUrl).then((res) => {
      const typeData = res.data.map((type) => ({
        value: type.id,
        label: type.name,
      }));
      setRestaurantTypes(typeData);
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

  const onSubmit = (data) => {
    const url = editId ? `/restaurants/edit/${editId}` : "/restaurants/add";
    //Change the data to match the endPoint
    const valuesClone = { ...data };
    valuesClone.restaurantTypes = valuesClone.restaurantTypes.map((type) => ({
      id: type.value,
      name: type.label,
    }));

    axios.post(url, valuesClone).then((res) => {
      console.log(res.data);
      if (!editId) {
        setRestaurantList([...restaurantList, res.data]);
        setItemsCount(itemsCount + 1);
      } else {
        const newRestaurantList = [...restaurantList];
        newRestaurantList[
          newRestaurantList.findIndex((rest) => rest.id === res.data.id)
        ] = res.data;
        setRestaurantList(newRestaurantList);
      }
    });
  };

  const initialValues = {
    name: "",
    address: "",
    description: "",
    restaurantTypes: [],
  };
  const [
    renderButton,
    renderInput,
    renderSelect,
    handleSubmit,
    setValue,
    reset,
  ] = useFormMethods(initialValues, addRestaurantSchema);

  const handleEditClick = useCallback(
    (restaurantId) => {
      setEditId(restaurantId);
      const url = `/restaurants/edit/${restaurantId}`;
      axios.get(url).then((res) => {
        // console.log("Edit restaurant", res.data);
        const editRestaurant = {
          ...res.data,
          restaurantTypes: res.data.restaurantTypes.map((type) => ({
            value: type.id,
            label: type.name,
          })),
        };
        for (const property in initialValues) {
          setValue(property, editRestaurant[property]);
        }
      });
    },
    [restaurantList]
  );

  const handleAddClick = useCallback(() => {
    setEditId("");
    reset();
  }, [restaurantList]);

  const handleDeleteClick = useCallback(
    async (deleteId) => {
      const isConfirmed = await reactModal(({ show, onSubmit, onDismiss }) => (
        <MyModal
          title="Delete confirmation"
          show={show}
          onDismiss={onDismiss}
          onSubmit={onSubmit}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          Are you sure you want to delete this restaurant?
        </MyModal>
      ));
      if (isConfirmed) {
        const url = `/restaurants/delete/${deleteId}`;
        axios.post(url).then((res) => {
          setRestaurantList(
            restaurantList.filter((item) => item.id !== deleteId)
          );
          setItemsCount(itemsCount - 1);
          fetchRestaurant();
        });
      }
    },
    [itemsCount, restaurantList]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="row">
      <FormOuter formName="Restaurant info">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInput("name", "Name", "Name..")}
          {renderInput("address", "Address", "Address...", "textarea")}
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
      </FormOuter>
      <div className="col-md-6">
        <DataTable
          handleEditClick={handleEditClick}
          handleAddClick={handleAddClick}
          handleDeleteClick={handleDeleteClick}
          itemList={restaurantList}
        />
        <MyPagination
          currentPage={currentPage}
          itemsCount={itemsCount}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RestaurantAdd;
