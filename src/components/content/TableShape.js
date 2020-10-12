import React, { useState } from "react";
import { Rect, Transformer, Ellipse, Text, Label, Tag } from "react-konva";

const TableShape = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  stageRef,
  isRect = true,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  const CustomTag = isRect ? "Rect" : "Ellipse";

  const [x, setX] = useState(shapeProps.x);
  const [y, setY] = useState(shapeProps.y);
  const [height, setHeight] = useState(shapeProps.height);
  const [width, setWidth] = useState(shapeProps.width);
  const [text, setText] = useState("New Table");

  const GAP = 5;

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const onLabelDblClick = (e) => {
    // at first lets find position of text node relative to the stage:
    const textPosition = e.target.absolutePosition();
    // then lets find position of stage container on the page:
    const stageBox = stageRef.current.container().getBoundingClientRect();

    // so position of inputElement will be the sum of positions above:
    const areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };
    // create inputElement and style it
    const inputElement = document.createElement("input");
    document.body.appendChild(inputElement);

    inputElement.value = e.target.attrs.text;
    inputElement.style.position = "absolute";
    inputElement.style.top = areaPosition.y + "px";
    inputElement.style.left = areaPosition.x + "px";
    inputElement.style.width = e.target.width();
    inputElement.maxLength = 18;

    inputElement.focus();

    const removeInputElement = () => {
      document.body.removeChild(inputElement);
      window.removeEventListener("click", handleOutsideClick);
    };

    const handleOutsideClick = (e) => {
      if (e.target !== inputElement) {
        setText(inputElement.value.trim());
        removeInputElement();
      }
    };

    inputElement.addEventListener("keydown", function (keyEvnt) {
      const ENTER_KEY = 13;
      if (keyEvnt.keyCode === ENTER_KEY) {
        setText(inputElement.value.trim());
        removeInputElement();
      }
    });

    // setTimeOut is required, without it the event will be added immediately
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  };
  const onTransformEnd = (e) => {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const newHeight = Math.max(50, node.height() * scaleY);

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);

    //set properties for label
    setX(node.x());
    setY(node.y());
    setHeight(newHeight);
    setWidth(Math.max(50, node.width() * scaleX));

    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(50, node.width() * scaleX),
      height: newHeight,
    });
  };
  const onDragEnd = (e) => {
    setX(e.target.x());
    setY(e.target.y());
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };
  return (
    <React.Fragment>
      <CustomTag
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      <Label
        x={isRect ? x : x - width / 2}
        y={(isRect ? y + height : y + height / 2) + GAP}
      >
        <Tag fill="yellow" />
        <Text
          text={text}
          fontSize={15}
          fill="black"
          padding={5}
          onDblClick={onLabelDblClick}
          onTap={onLabelDblClick}
        />
      </Label>
    </React.Fragment>
  );
};

export default TableShape;
