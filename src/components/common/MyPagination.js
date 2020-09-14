import React from "react";
import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";

const MyPagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <Pagination>
      {pages.map((page) => (
        <Pagination.Item
          onClick={() => onPageChange(page)}
          key={page}
          active={currentPage === page}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default MyPagination;
