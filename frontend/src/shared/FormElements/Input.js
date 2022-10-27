import React, { useEffect, useReducer } from "react";

import { validate } from "../../shared/util/validators";

import classes from "./Input.module.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value   : action.val,
        isValid : validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value     : initialValue || '',
    isTouched : false,
    isValid   : initialValid || false
  });


  const {value, isValid} = inputState;
  useEffect(() => {
    onInput(id, value, isValid)
  },[id, value, isValid, onInput]);

  const onChangeHandler = (event) => {
    dispatch({
      type : "CHANGE",
      val  : event.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const elem =
    element === "input" ? (
      <input
        id          ={id}
        type        ={type}
        placeholder ={placeholder}
        onChange    ={onChangeHandler}
        onBlur      ={touchHandler}
        value       ={inputState.value}
      />
    ) : (
      <textarea
        id       ={id}
        rows     ={rows || 3}
        onChange ={onChangeHandler}
        onBlur   ={touchHandler}
        value    ={inputState.value}
      />
    );


  return (
    <div
      className={
        classes["form-control"] +
        " " +
        (!inputState.isValid &&
          inputState.isTouched &&
          classes["form-control--invalid"])
      }
    >
      <label htmlFor={id}>{label}</label>
      {elem}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
