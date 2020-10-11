import React, { useEffect, useRef } from "react";
import { pageTitleState } from "../NavBar";
import { useRecoilState } from "recoil";
import DiningTableCanvas from "./DiningTableCanvas";
import { useContainerDimensions } from "../common/customHooks/useContainerDimesion";

const initialShapes = [
  {
    isRect: true,
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
  },
  {
    isRect: false,
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
  },
];

const DiningTable = () => {
  const [pageTitle, setPageTitle] = useRecoilState(pageTitleState);
  const [shapes, setShapes] = React.useState(initialShapes);

  useEffect(() => {
    setPageTitle("Table Management");
    return () => {
      setPageTitle("");
    };
  }, [setPageTitle]);

  const stageRef = useRef();
  const { width } = useContainerDimensions(stageRef);

  const addShape = (isRect) => {
    const newRect = {
      isRect: isRect,
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: "red",
    };
    setShapes([...shapes, newRect]);
  };

  return (
    <div className="row">
      <div className="card col-md-3">
        <div className="card-body">
          <button onClick={() => addShape(true)}> Add Rectangle</button>
          <button onClick={() => addShape(false)}>Add circle</button>
          <label htmlFor="">Table Number</label>
          <input type={"text"} />
          <label htmlFor="">Table Name</label>
          <input type={"text"} />
          <label htmlFor="">Area</label>
          <input type={"text"} />
        </div>
      </div>
      <div className="card col-md-9">
        <div className="card-body" ref={stageRef}>
          <DiningTableCanvas
            shapes={shapes}
            stageWidth={width}
            onChange={(newAttrs, i) => {
              const shapesClone = [...shapes];
              shapesClone[i] = newAttrs;
              setShapes(shapesClone);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiningTable;
