import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import { StoreContext } from "../../index";

const DataTable = observer(() => {
  const store = useContext(StoreContext);
  const handleClick = (restaurantId) => {
    store.restaurantState.editRestaurant = null; //to reset form
    store.restaurantState.formReset();
    store.restaurantState.fetchEditRestaurant(restaurantId);
  };

  const addNew = () => {
    store.restaurantState.editRestaurant = {
      name: null,
      address: null,
      description: null,
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
              Add
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
                onClick={() => handleClick(restaurant.id)}
                variant="info"
                className="btn-block"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button variant="danger" className="btn-block">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default DataTable;
