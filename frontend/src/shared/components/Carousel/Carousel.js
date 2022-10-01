import React, { useEffect, useRef, useState } from "react";

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
  const [rewind, setRewind] = useState(false);

  const childrenArray = useRef(React.Children.toArray(children));

  const n_items = visibleItems && visibleItems > 0 && 
                (dataSize - visibleItems) >= 0 
                ? visibleItems 
                : 1;

  const steps = dataSize - n_items + 1;
  if(childrenArray.current.length !== steps + 1)
    childrenArray.current.push(childrenArray.current[0]);

  useEffect(() => {
    if(rewind !== false){
      setRewind(false);
      setPos(rewind === 0 ? 1 : steps - 1);
    }
  },[rewind]);
  
  const next = () => {
    setPos((prevValue) => {
        if( prevValue !== steps)
            return (prevValue % steps) + 1;

        setRewind(0);
        return prevValue;
    });
  };

  const previous = () => {
    setPos((prevValue) => {
      if(prevValue !== 0)
        return (prevValue % -steps) - 1;
      
      setRewind(steps);
      return prevValue;
    });
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

  let transform = {
    transition  : 'transform 0.3s',
    transform   : `translateX(${-pos}00%)`
  };

  if(rewind !== false){
    console.log('here! ' + rewind);
    transform = {
      transform   : `translateX(${-rewind}00%)`
    };
  }

  const slider = {
    ...transform,
    width  : `${itemWidth}px`,
  };

  console.log(slider);

  return (
    <div className={classes.outer}>
        <div className={classes.carousel} style={visibleArea}>
            <div className={classes.inner} style={slider}>
                {childrenArray.current.map((child) => {
                  return React.cloneElement(child, { width: "100%" }); 
                })}
            </div>
            {buttons}
        </div>
    </div>
  );
};

export default Carousel;
