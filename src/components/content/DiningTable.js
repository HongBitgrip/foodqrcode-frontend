import React, { useEffect, useRef } from "react";
import { pageTitleState } from "../NavBar";
import { useRecoilState } from "recoil";
import DiningTableCanvas from "./DiningTableCanvas";
import { useContainerDimensions } from "../common/customHooks/useContainerDimesion";
import useFormMethods from "../common/customHooks/useFormMethods";

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

  const initialValues = { tableSize: "", area: 2 };
  const { renderInput, renderSelect, getValues } = useFormMethods(
    initialValues
  );

  useEffect(() => {
    setPageTitle("Table Management");
    return () => {
      setPageTitle("");
    };
  }, [setPageTitle]);

  const stageRef = useRef();
  const { width } = useContainerDimensions(stageRef);

  const addShape = (isRect) => {
    let shapeSize = parseInt(getValues("tableSize"));
    //make sure the min dimension is 50
    if (!shapeSize || shapeSize < 50) {
      shapeSize = 50;
    }
    const newShape = {
      isRect: isRect,
      x: isRect ? 10 : 60,
      y: isRect ? 10 : 60,
      width: shapeSize,
      height: shapeSize,
      fill: "blue",
    };
    setShapes([...shapes, newShape]);
  };

  return (
    <div className="row">
      <div className="card col-md-3">
        <div className="card-body">
          {renderInput(
            "tableSize",
            "Table Size",
            "Default 100, Min 50",
            "number"
          )}
          <button className="btn btn-primary" onClick={() => addShape(true)}>
            Add Rectangle
          </button>
          <button className="btn btn-default" onClick={() => addShape(false)}>
            Add circle
          </button>
          {renderSelect(
            "area",
            "Area",
            [
              { value: 1, label: "1st floor" },
              { value: 2, label: "2nd floor" },
            ],
            false
          )}
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
