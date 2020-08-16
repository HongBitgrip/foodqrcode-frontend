import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import { TiEdit } from "react-icons/ti";
import { MdLibraryAdd } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  isEditState,
  editRestaurantState,
  restaurantListState,
} from "./RestaurantAdd";

const DataTable = observer(({ handleEditClick, handleAddClick }) => {
  const restaurantList = useRecoilValue(restaurantListState);

  return (
    <Table className="col-md-6" striped bordered hover>
      <thead className="text-primary">
        <tr>
          <th>Name</th>
          <th colSpan="2">
            <Button
              onClick={() => handleAddClick()}
              variant="success"
              className="btn-block"
            >
              <MdLibraryAdd fontSize="large" />
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {restaurantList.map((restaurant) => (
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
