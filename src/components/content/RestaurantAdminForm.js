import React, { useCallback, useEffect, useState } from "react";
import FormOuter from "../common/FormOuter";
import axios from "axios";
import { object, ref, string } from "yup";
import useFormMethods from "../common/customHooks/useFormMethods";
import reactModal from "../common/reactModal";
import MyModal from "../common/MyModal";
import SearchBox from "./SearchBox";
import DataTable from "../common/DataTable";
import MyPagination from "../common/MyPagination";
import PasswordResetFrame from "./PasswordResetFrame";
import { randomString } from "../utils";

const AdminAdd = () => {
  const [adminList, setAdminList] = useState([]);

  const [restaurants, setRestaurants] = useState([]);

  const [editId, setEditId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsCount, setItemsCount] = useState(0);

  const [searchEmail, setSearchEmail] = useState(null);

  const [password, setPassword] = useState();

  const PAGE_SIZE = 10;

  const addAdminSchema = object({
    email: string().required("Email is required").email("Not a valid email"),
    restaurant: object({
      label: string().required(),
      value: string().required(),
    }).typeError("Select a restaurant"),
  });

  const initialValues = {
    email: "",
    restaurant: null,
  };

  const {
    renderButton,
    renderInput,
    renderSelect,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useFormMethods(initialValues, addAdminSchema);

  const watchIsResetPassword = watch("isResetPassword", false);

  const fetchAdminList = (searchEmail = null) => {
    const url = "/restaurant_admins/all_pageable";
    axios
      .get(url, {
        params: {
          page: currentPage - 1,
          pageSize: PAGE_SIZE,
          email: searchEmail,
        },
      })
      .then((res) => {
        setAdminList(
          res.data.content.map((admin) => ({ id: admin.id, name: admin.email }))
        );
        setItemsCount(res.data.totalElements);
      });
  };
  useEffect(() => fetchAdminList(searchEmail), [currentPage, searchEmail]);

  useEffect(() => {
    const getAllRestaurantsUrl = "/restaurants/all";
    axios.get(getAllRestaurantsUrl).then((res) => {
      const restaurantData = res.data.map((type) => ({
        value: type.id,
        label: type.name,
      }));
      setRestaurants(restaurantData);
    });
  }, []);

  const onSubmit = (data) => {
    const url = editId
      ? `/restaurant_admins/edit/${editId}`
      : "/restaurant_admins/add";
    //Change the data to match the endPoint
    const valuesClone = { ...data };
    valuesClone.restaurant = {
      id: valuesClone.restaurant.value,
      name: valuesClone.restaurant.label,
    };

    //Create random password
    const newPassword = randomString(15);
    setPassword(newPassword);
    valuesClone.password = newPassword;

    console.log("value", valuesClone);

    axios
      .post(url, valuesClone)
      .then((res) => {
        console.log(res.data);
        if (!editId) {
          fetchAdminList(searchEmail);
        } else {
          const newAdminList = [...adminList];
          newAdminList[
            newAdminList.findIndex((admin) => admin.id === res.data.id)
          ] = { id: res.data.id, name: res.data.email, ...res.data };
          setAdminList(newAdminList);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleEditClick = useCallback(
    (adminId) => {
      setEditId(adminId);
      const url = `/restaurant_admins/edit/${adminId}`;
      axios.get(url).then((res) => {
        console.log("Restaurant admin", res.data);
        const editAdmin = {
          ...res.data,
          restaurant: {
            value: res.data.restaurant.id,
            label: res.data.restaurant.name,
          },
        };
        for (const property in initialValues) {
          setValue(property, editAdmin[property]);
        }
      });
    },
    [adminList]
  );

  const handleAddClick = useCallback(() => {
    setEditId("");
    reset();
  }, [adminList]);

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
          Are you sure you want to delete this restaurant admin?
        </MyModal>
      ));
      if (isConfirmed) {
        const url = `/restaurant_admins/delete/${deleteId}`;
        axios.post(url).then((res) => {
          setAdminList(adminList.filter((item) => item.id !== deleteId));
          setItemsCount(itemsCount - 1);
          fetchAdminList();
        });
      }
    },
    [itemsCount, adminList]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSearchSubmit = (data) => {
    setSearchEmail(data.query);
  };

  return (
    <div className="row">
      <FormOuter formName="Restaurant admin info">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInput("email", "Email", "Email..")}
          {renderSelect("restaurant", "Restaurant", restaurants, false)}
          {editId &&
            renderInput("isResetPassword", "Reset Password", null, "checkbox")}
          {(!editId || watchIsResetPassword) && (
            <PasswordResetFrame password={password} />
          )}
          {/*{renderInput("password", "Password", "Password...", "password")}*/}
          {/*{renderInput(*/}
          {/*  "confirmPassword",*/}
          {/*  "Confirm Password",*/}
          {/*  "Confirm password...",*/}
          {/*  "password"*/}
          {/*)}*/}
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
          itemList={adminList}
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

export default AdminAdd;
