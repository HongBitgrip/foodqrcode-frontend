import React from "react";
import { FaSearch } from "react-icons/fa/index";
import useFormMethods from "../common/useFormMethods";

const SearchBox = ({ onSubmit }) => {
  const { handleSubmit, register } = useFormMethods("");
  return (
    <form className="my-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group md-form form-sm form-2 pl-0">
        <input
          name="query"
          className="form-control rounded-left"
          type="text"
          placeholder="Search..."
          aria-label="Search"
          ref={register}
        />
        <div className="input-group-append">
          <button className="btn btn-sm my-0" type="submit">
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
