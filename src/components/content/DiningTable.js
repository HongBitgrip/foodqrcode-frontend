import React, { useEffect, useRef } from "react";
import { pageTitleState } from "../NavBar";
import { useRecoilState } from "recoil";
import DiningTableCanvas from "./DiningTableCanvas";
import { useContainerDimensions } from "../common/customHooks/useContainerDimesion";

const DiningTable = () => {
  const [pageTitle, setPageTitle] = useRecoilState(pageTitleState);

  useEffect(() => {
    setPageTitle("Table Management");
    return () => {
      setPageTitle("");
    };
  }, [setPageTitle]);

  const stageRef = useRef();
  const { width } = useContainerDimensions(stageRef);

  return (
    <div className="row">
      <div className="card col-md-2">
        <div className="card-body">
          <button>Add Rectangle</button>
          <button>Add circle</button>
          <label htmlFor="">Table Number</label>
          <input type={"text"} />
          <label htmlFor="">Table Name</label>
          <input type={"text"} />
          <label htmlFor="">Area</label>
          <input type={"text"} />
        </div>
      </div>
      <div className="card col-md-10">
        <div className="card-body" ref={stageRef}>
          <DiningTableCanvas stageWidth={width} />
        </div>
      </div>
    </div>
  );
};

export default DiningTable;
