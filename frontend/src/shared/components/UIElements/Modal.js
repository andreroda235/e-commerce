import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

import classes from "./Modal.module.css";


const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  contentClass,
  footerClass,
  footer,
  onSubmit,
  children,
}) => {
  const content = (
    <div className={classes.modal + " " + (className ? className : ' ')} style={style}>
      <header className={classes.header + " " + headerClass}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={classes.content + " " + (contentClass ? contentClass : ' ')}>{children}</div>
        <footer className={classes.footer + " " + (footerClass ? footerClass : ' ')}>{footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {

    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames={
                    {
                        enter: classes['modal-enter'],
                        enterActive: classes['modal-enter-active'],
                        exit: classes['modal-exit'],
                        exitActive: classes['modal-exit-active']
                    }
                }
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </>
    );
};

export default Modal;
