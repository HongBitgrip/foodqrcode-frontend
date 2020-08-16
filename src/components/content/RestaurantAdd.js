import axios from "axios";
import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { Field, Form, withFormik } from "formik";
import * as Yup from "yup";
import DataTable from "./DataTable";
import AddingForm from "./AddingForm";
import SubmitButton from "./SubmitButton";
import InputWrapper from "./InputWrapper";
import MySelect from "./MySelect";

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

  const addRestaurantSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Description is required"),
    restaurantTypes: Yup.array()
      .ensure()
      .min(1, "Pick at least 1 type")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
  });

  const initialValues = {
    name: "",
    address: "",
    description: "",
    restaurantTypes: [],
  };

  const submitHandler = (values) => {
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

  const formEnhancer = withFormik({
    mapPropsToValues: (outerProps) => ({
      name: outerProps.restaurant.name,
      address: outerProps.restaurant.address,
      description: outerProps.restaurant.description,
      restaurantTypes: outerProps.restaurant.restaurantTypes,
    }),
    validationSchema: addRestaurantSchema,
    handleSubmit: submitHandler,
    displayName: "EditRestaurantForm",
  });

  const MyForm = ({
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
  }) => (
    <Form>
      <InputWrapper
        errorMessage={errors.name && touched.name ? errors.name : null}
      >
        <label htmlFor="name">Name</label>
        <Field name="name" className="form-control" placeholder="Enter name" />
      </InputWrapper>

      <InputWrapper
        errorMessage={errors.address && touched.address ? errors.address : null}
      >
        <label htmlFor="address">Address</label>
        <Field
          name="address"
          as="textarea"
          className="form-control rounded border"
          placeholder="Enter address"
        />
      </InputWrapper>

      <InputWrapper
        errorMessage={
          errors.description && touched.description ? errors.description : null
        }
      >
        <label htmlFor="description">Description</label>
        <Field
          name="description"
          as="textarea"
          className="form-control rounded border"
          placeholder="Enter description"
        />
      </InputWrapper>

      <InputWrapper
        errorMessage={
          errors.restaurantTypes && touched.restaurantTypes
            ? errors.restaurantTypes
            : null
        }
      >
        <label htmlFor="restaurantTypes">Restaurant types</label>
        <MySelect
          value={values.restaurantTypes}
          selectName="restaurantTypes"
          options={restaurantTypes}
          multi={true}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      </InputWrapper>
      <SubmitButton
        buttonName={isEdit ? "Edit" : "Add"}
        buttonClass={isEdit ? "btn-info" : "btn-success"}
      />
    </Form>
  );

  const MyEnhancedForm = formEnhancer(MyForm);

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
        <MyEnhancedForm restaurant={isEdit ? editRestaurant : initialValues} />
      </AddingForm>
      <DataTable
        handleEditClick={handleEditClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
};

export default RestaurantAdd;
