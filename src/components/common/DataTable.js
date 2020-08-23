import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever, MdLibraryAdd } from "react-icons/md";
import useTraceUpdate from "use-trace-update";
import MyPagination from "./MyPagination";

const DataTable = ({
  handleEditClick,
  handleAddClick,
  handleDeleteClick,
  itemList,
}) => {
  // useTraceUpdate(props);

  return (
    <Table striped bordered hover>
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
              <Button
                onClick={() => handleDeleteClick(item.id)}
                variant="danger"
                className="btn-block"
              >
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
