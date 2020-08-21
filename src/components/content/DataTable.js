import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever, MdLibraryAdd } from "react-icons/md";

const DataTable = ({ handleEditClick, handleAddClick, itemList }) => {
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
        {itemList.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <Button
                onClick={() => handleEditClick(item.id)}
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
};

export default DataTable;
