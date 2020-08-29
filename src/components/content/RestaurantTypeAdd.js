import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FormOuter from "../common/FormOuter";
import useFormMethods from "../common/customHooks/useFormMethods";
import { object, string } from "yup";
import SearchBox from "./SearchBox";
import DataTable from "../common/DataTable";
import MyPagination from "../common/MyPagination";
import reactModal from "../common/reactModal";
import MyModal from "../common/MyModal";

const RestaurantTypeAdd = () => {
  const PAGE_SIZE = 10;
  const [editId, setEditId] = useState("");

  const [typeList, setTypeList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchName, setSearchName] = useState(null);

  const [itemsCount, setItemsCount] = useState(0);

  const fetchTypeList = (searchName = null) => {
    const url = "/restaurant_types/all_pageable";
    axios
      .get(url, {
        params: {
          page: currentPage - 1,
          pageSize: PAGE_SIZE,
          name: searchName,
        },
      })
      .then((res) => {
        setTypeList(res.data.content);
        setItemsCount(res.data.totalElements);
      });
  };
  useEffect(() => fetchTypeList(searchName), [currentPage, searchName]);

  const addRestaurantTypeSchema = object({
    name: string().required("Name is required"),
    description: string().required("Description is required"),
  });

  const initialValues = {
    name: "",
    description: "",
  };
  const {
    renderButton,
    renderInput,
    handleSubmit,
    setValue,
    reset,
  } = useFormMethods(initialValues, addRestaurantTypeSchema);

  const handleEditClick = useCallback(
    (restaurantId) => {
      setEditId(restaurantId);
      const url = `/restaurant_types/edit/${restaurantId}`;
      axios.get(url).then((res) => {
        // console.log("Edit type", res.data);
        for (const property in initialValues) {
          setValue(property, res.data[property]);
        }
      });
    },
    [typeList]
  );

  const handleAddClick = useCallback(() => {
    setEditId("");
    reset();
  }, [typeList]);

  //TODO:Edit this method, when there is delete contrains error, show error
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
          Are you sure you want to delete this restaurant type?
        </MyModal>
      ));
      if (isConfirmed) {
        const url = `/restaurant_types/delete/${deleteId}`;
        axios.post(url).then((res) => {
          setTypeList(typeList.filter((item) => item.id !== deleteId));
          setItemsCount(itemsCount - 1);
          fetchTypeList();
        });
      }
    },
    [itemsCount, typeList]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSearchSubmit = (data) => {
    setSearchName(data.query);
  };

  const onSubmit = (data) => {
    const url = editId
      ? `/restaurant_types/edit/${editId}`
      : "/restaurant_types/add";

    axios.post(url, data).then((res) => {
      console.log(res.data);
      if (!editId) {
        fetchTypeList(searchName);
      } else {
        const newTypeList = [...typeList];
        newTypeList[newTypeList.findIndex((rest) => rest.id === res.data.id)] =
          res.data;
        setTypeList(newTypeList);
      }
    });
  };
  return (
    <div className="row">
      <FormOuter formName="Restaurant type info">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInput("name", "Name", "Name...")}
          {renderInput(
            "description",
            "Description",
            "Description...",
            "textarea"
          )}
          {renderButton(
            editId ? "Edit" : " Add",
            editId ? "btn-info" : "btn-primary"
          )}
        </form>
      </FormOuter>
      <div className="col-md-6">
        <SearchBox onSubmit={onSearchSubmit} />
        <DataTable
          handleEditClick={handleEditClick}
          handleAddClick={handleAddClick}
          handleDeleteClick={handleDeleteClick}
          itemList={typeList}
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

export default RestaurantTypeAdd;
