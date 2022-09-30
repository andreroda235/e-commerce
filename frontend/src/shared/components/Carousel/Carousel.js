import React, { useState } from "react";

import classes from "./Carousel.module.css";

export const CarouselItem = ({ children }) => {
    return (
        <div className={classes["carousel-item"]}>
            {children}
        </div>
    );
};

const Carousel = ({
  children,
  dataSize,
  visibleItems,
  itemWidth,
  height,
  groupArrowPos,
  groupArrowHeight,
}) => {
  const [pos, setPos] = useState(0);

  const n_items = visibleItems && 
                visibleItems > 0 && 
                (dataSize - visibleItems) >= 0 
                ? visibleItems : 1;

  const steps = dataSize - n_items + 1;

  const next = () => {
    setPos((prevValue) => 
        prevValue === steps - 1 ? 0 : (prevValue % steps) + 1
    );
  };
  const previous = () => {
    setPos((prevValue) => 
        prevValue === 0 ? steps - 1 : (prevValue % -steps) - 1
    );
  };

  let arrowDivPos = {};
  if (groupArrowPos === "top") arrowDivPos = { top: 0 };
  else if (groupArrowPos === "bottom") arrowDivPos = { bottom: 0 };
  const arrowDivHeight = groupArrowHeight
    ? { height: groupArrowHeight + "px" }
    : { height: "100%" };

  const arrowDivStyle = {
    ...arrowDivPos,
    ...arrowDivHeight,
  };

  const buttons = (
    <div className={classes["overlay-btns"]} style={arrowDivStyle}>
      <button onClick={previous}>{"<"}</button>
      <button onClick={next}>{">"}</button>
    </div>
  );

  const visibleArea = {
    width   :   visibleItems ? `${visibleItems * itemWidth}px` : '100%',
    height  :   height ? height + "px" : "fit-content",
  };

  const slider = {
    transform   : `translateX(-${pos}00%)`,
    width       : `${itemWidth}px`,
  };

  return (
    <div className={classes.outer}>
        <div className={classes.carousel} style={visibleArea}>
            <div className={classes.inner} style={slider}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, { width: "100%" });
                })}
            </div>
            {buttons}
        </div>
    </div>
  );
};

export default Carousel;
