import React from "react";
import { Layer, Stage } from "react-konva";
import TableShape from "./TableShape";

const initialShapes = [
  {
    isRect: true,
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    isRect: false,
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const DiningTableCanvas = ({ stageWidth }) => {
  const [shapes, setShapes] = React.useState(initialShapes);
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      width={stageWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {shapes.map((shape, i) => {
          return (
            <TableShape
              isRect={shape.isRect}
              key={i}
              shapeProps={shape}
              isSelected={shape.id === selectedId}
              onSelect={() => {
                selectShape(shape.id);
              }}
              onChange={(newAttrs) => {
                const shapesClone = [...shapes];
                shapesClone[i] = newAttrs;
                setShapes(shapesClone);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default DiningTableCanvas;
