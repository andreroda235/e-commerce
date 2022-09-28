import React from 'react';

import classes from './Avatar.module.css';

const Avatar = ({style, image, alt, width}) => {
  return (
    <div className={classes.avatar} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width: width, height: width }}
      />
    </div>
  );
};

export default Avatar;
