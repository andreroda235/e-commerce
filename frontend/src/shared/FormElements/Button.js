import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = ({href, size, inverse, danger, to, exact, type, onClick, disabled, children}) => {

    /* className={`button button--${size || 'default'} ${inverse &&
        'button--inverse'} ${danger && 'button--danger'}`} */

  if (href) {
    return (
      <a
        className={classes.button + ' ' + classes[`button--${size || 'default'}`] + ' ' + classes[`${inverse &&
          'button--inverse'}`] + ' ' + classes[`${danger && 'button--danger'}`]}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={classes.button + ' ' + classes[`button--${size || 'default'}`] + ' ' + classes[`${inverse &&
          'button--inverse'}`] + ' ' + classes[`${danger && 'button--danger'}`]}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={classes.button + ' ' + classes[`button--${size || 'default'}`] + ' ' + classes[`${inverse &&
          'button--inverse'}`] + ' ' + classes[`${danger && 'button--danger'}`]}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
