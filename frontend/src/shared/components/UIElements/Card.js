import React from 'react';

import classes from './Card.module.css';

const Card = ({style, children, className}) => {
  return (
    <div className={classes.card + ' ' + className} style={style}>
      {children}
    </div>
  );
};

export default Card;
