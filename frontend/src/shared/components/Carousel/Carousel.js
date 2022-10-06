import React, { cloneElement, createRef, useEffect, useReducer, useRef, useState } from "react";
import CustomButton from "../UIElements/Buttons/CustomButton";

import classes from "./Carousel.module.css";

export const CarouselItem = React.forwardRef(({children}, ref) => {
  return (
      <div className={classes["carousel-item"]} ref={ ref ? ref : null}>
          {children}
      </div>
  );
});


/* 
  TODO:
    -adding spacing between items => itemSize + margin. DONE
    -option between seamless looping or snapping back. DONE
      -check seamless transition when visibileItems > 1.
    -automatically calculate children size. DONE
    -refactor to useReducer. DONE
      -if useReducer doens't fix button spam problem
      then consider adding timer option to buttons. DONE
*/

const initialState = {
  pos     : 0,
  rewind  : false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'next': {
      if(state.pos !== action.steps - 1)
        return {
          ...state,
          pos: (state.pos % action.steps) + 1
        };
      
      if(action.snapBack)
        return {...state, pos: 0};
      return {...state, rewind: 0};
    }
    case 'previous':{
      if(state.pos !== 0)
        return {
            ...state,
            pos: (state.pos % -action.steps) - 1
          };
      if(action.snapBack)
        return {...state, pos: action.steps - 1};
      return {...state, rewind: action.steps - 1};
    }
    case 0:{
      return {
        rewind: false,
        pos: state.rewind === 0 ? 1 : action.steps - 2
      };
    }
    default:
      return state;
  }
}

const Carousel = ({
  children,
  dataSize,
  visibleItems,
  width,
  height,
  spacing,
  groupArrowPos,
  groupArrowHeight,
  snapBack
}) => {

  const [state, dispatch]         = useReducer(reducer, initialState);
  const [itemWidth, setItemWidth] = useState(width);
  const childrenArray             = useRef(React.Children.toArray(children));
  const sampleRef                 = createRef();
  const space                     = spacing ? spacing : 0;
  const steps                     = snapBack ? dataSize : dataSize + 1;
  const n_items                   = visibleItems && visibleItems > 0 && 
                                    (dataSize - visibleItems) >= 0 
                                    ? visibleItems 
                                    : 1;

  if(childrenArray.current.length !== dataSize + 1 && !snapBack){
    childrenArray.current.push(cloneElement(childrenArray.current[0], 
    {width: '100%', key: '.' + dataSize}));
  };

  useEffect(() => {
    if(!itemWidth){
      let width = sampleRef.current.children[0].style.width;
      width = parseFloat(width.replace(/px/i, ''));
      setItemWidth(width);
    }
  }, [sampleRef, itemWidth]);

  useEffect(() => {  
    if(!snapBack && state.rewind !== false)
      dispatch({type: 0, steps});
  }, [state.rewind, steps, snapBack]);
  
  const next = () => {
    dispatch({type: 'next', steps, snapBack});
  };

  const previous = () => {
    dispatch({type: 'previous', steps, snapBack});
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
      <CustomButton arrow flip fitParent size="big" timeout={300} onClick={previous}/>
      <CustomButton arrow fitParent size="big" timeout={300} onClick={next}/>
    </div>
  );

  const visibleArea = {
    width   :   itemWidth ? `${n_items * itemWidth + space}px` : '100%',
    height  :   height ? height + "px" : "fit-content",
  };

  let transform = {
    transition  : 'transform 0.3s',
    transform   : `translateX(${-state.pos}00%)`
  };

  if(!snapBack && state.rewind !== false){
    transform = {
      transform  : `translateX(${-state.rewind}00%)`
    };
  }

  const slider = {
    ...transform,
    width  : itemWidth ? `${itemWidth + space}px` : '100%',
  };


  return (
    <div className={classes.outer}>
        <div className={classes.carousel} style={visibleArea}>
            <div className={classes.inner} style={slider}>
                {childrenArray.current.map((child, index) => {
                  if(index === 0)
                    return React.cloneElement(child, {width: "100%", ref: sampleRef}); 
                  return React.cloneElement(child, {width: "100%"}); 
                })}
            </div>
            {buttons}
        </div>
    </div>
  );
};

export default Carousel;
