import React, { useCallback, useEffect, useState } from "react";
import FormOuter from "../common/FormOuter";
import useFormMethods from "../common/customHooks/useFormMethods";
import { object, ref, string, boolean } from "yup";
import axios from "axios";
import reactModal from "../common/reactModal";
import MyModal from "../common/MyModal";
import SearchBox from "./SearchBox";
import DataTable from "../common/DataTable";
import MyPagination from "../common/MyPagination";
import { ErrorMessage } from "../common/ErrorMessage";

const AdminForm = () => {
  const [adminList, setAdminList] = useState([]);

  const [editId, setEditId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsCount, setItemsCount] = useState(0);

  const [searchEmail, setSearchEmail] = useState(null);

  const [error, setError] = useState(null);

  const PAGE_SIZE = 10;

  const addAdminSchema = object({
    isChangePassword: boolean(),
    email: string().required("Email is required").email("Not a valid email"),
    oldPassword: string().when(
      "isChangePassword",
      (isChangePassword, schema) => {
        if (isChangePassword || !editId) {
          return schema.required("Old password is required");
        }
      }
    ),
    password: string().when("isChangePassword", (isChangePassword, schema) => {
      if (isChangePassword || !editId) {
        return schema.required("Password is required");
      }
    }),
    confirmPassword: string().when(
      "isChangePassword",
      (isChangePassword, schema) => {
        if (isChangePassword || !editId) {
          return schema.oneOf([ref("password"), null], "Password must match");
        }
      }
    ),
  });

  const initialValues = {
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    restaurant: null,
  };

  const {
    renderButton,
    renderInput,
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useFormMethods(initialValues, addAdminSchema);

  const watchIsChangePassword = watch("isChangePassword", false);

  const fetchAdminList = (searchEmail = null) => {
    const url = "/admins/all_pageable";
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

  const onSubmit = (data) => {
    const url = editId ? `/admins/edit/${editId}` : "/admins/add";
    console.log(data);
    axios
      .post(url, data)
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
        setError(error.response.data.message);
      });
  };

  const handleEditClick = useCallback(
    (adminId) => {
      setEditId(adminId);
      const url = `/admins/edit/${adminId}`;
      axios.get(url).then((res) => {
        console.log("admin", res.data);
        for (const property in initialValues) {
          setValue(property, res.data[property]);
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
        const url = `/admins/delete/${deleteId}`;
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
      <FormOuter formName="Admin info">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInput("email", "Email", "Email..")}
          {editId &&
            renderInput(
              "isChangePassword",
              "Change password",
              null,
              "checkbox"
            )}
          {editId &&
            watchIsChangePassword &&
            renderInput(
              "oldPassword",
              "Old Password",
              "Old password...",
              "password"
            )}
          {(!editId || watchIsChangePassword) &&
            renderInput("password", "Password", "Password...", "password")}
          {(!editId || watchIsChangePassword) &&
            renderInput(
              "confirmPassword",
              "Confirm Password",
              "Confirm password...",
              "password"
            )}
          <ErrorMessage error={error} />
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

export default AdminForm;
