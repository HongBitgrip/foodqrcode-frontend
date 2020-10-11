import React, { useRef } from "react";
import { Layer, Stage } from "react-konva";
import TableShape from "./TableShape";

const DiningTableCanvas = ({ stageWidth, onChange, shapes }) => {
  const [selectedId, selectShape] = React.useState(null);
  const stageRef = useRef();

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
      ref={stageRef}
    >
      <Layer>
        {shapes.map((shape, i) => {
          shape.id = i;
          return (
            <TableShape
              isRect={shape.isRect}
              key={i}
              shapeProps={shape}
              isSelected={shape.id === selectedId}
              onSelect={() => {
                selectShape(shape.id);
              }}
              stageRef={stageRef}
              onChange={(newAttrs) => onChange(newAttrs, i)}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default DiningTableCanvas;
