import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./SideDrawer.module.css";

const SideDrawer = ({ children, show, onClick, left}) => {

  const from = left ? 'left' : 'right';

  const content = (
    <CSSTransition
      in          ={show}
      timeout     ={200}
      classNames  ={`slide-in-${from}`}
      mountOnEnter
      unmountOnExit
    >
      <aside className={classes['side-drawer'] + ' ' + classes[from]} >{children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
