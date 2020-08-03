import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import { StoreContext } from "../../index";
import { TiEdit } from "react-icons/ti";
import { MdLibraryAdd } from "react-icons/md";

import { MdDeleteForever } from "react-icons/md";

const DataTable = observer(() => {
  const store = useContext(StoreContext);
  const handleEditClick = (restaurantId) => {
    store.restaurantState.isEdit = true;
    store.restaurantState.editRestaurant = null; //to reset form
    store.restaurantState.formReset();
    store.restaurantState.fetchEditRestaurant(restaurantId);
  };

  const addNew = () => {
    store.restaurantState.isEdit = false;
    store.restaurantState.formReset();
    store.restaurantState.editRestaurant = {
      name: "",
      address: "",
      description: "",
    };
  };

  return (
    <Table className="col-md-6" striped bordered hover>
      <thead className="text-primary">
        <tr>
          <th>Name</th>
          <th colSpan="2">
            <Button
              onClick={() => addNew()}
              variant="success"
              className="btn-block"
            >
              <MdLibraryAdd fontSize="large" />
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {store.restaurantState.restaurantList.map((restaurant) => (
          <tr key={restaurant.id}>
            <td>{restaurant.name}</td>
            <td>
              <Button
                onClick={() => handleEditClick(restaurant.id)}
                variant="info"
                className="btn-block"
              >
                <TiEdit fontSize="large" />
              </Button>
            </td>
            <td>
              <Button variant="danger" className="btn-block">
                <MdDeleteForever fontSize="large" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default DataTable;
