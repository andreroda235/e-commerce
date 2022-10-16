import React from 'react';

import classes from './Card.module.css';

const Card = ({style, children, className, shadow}) => {
  return (
    <div className={classes.card + ' ' + className + ' ' + (shadow && classes.shadow)} style={style}>
      {children}
    </div>
  );
};

export default Card;
