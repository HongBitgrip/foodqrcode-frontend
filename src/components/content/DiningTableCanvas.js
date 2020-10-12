import React, { useRef } from "react";
import { Layer, Stage } from "react-konva";
import TableShape from "./TableShape";

const DiningTableCanvas = ({
  stageWidth,
  onChange,
  shapes,
  color,
  setColor,
  selectedId,
  setSelectedId,
}) => {
  const stageRef = useRef();

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
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
          const isSelected = i === selectedId;
          return (
            <TableShape
              isRect={shape.isRect}
              key={i}
              shapeProps={shape}
              isSelected={isSelected}
              onSelect={() => {
                setSelectedId(shape.id);
                const cloneColor = { ...color };
                cloneColor.hex = shape.fill;
                setColor(cloneColor);
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
