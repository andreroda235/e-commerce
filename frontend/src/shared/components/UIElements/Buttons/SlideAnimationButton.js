import { useState } from 'react';

import classes from './SlideAnimationButton.module.css';


const SlideAnimiationButton = ({title, onClick, disabled}) => {
    const [slide, setSlide] = useState(0);
    
    const onButtonHover = () => {
        setSlide(1);
    };

    const onButtonHoverExit = () => {
        setSlide(0);
    };

    const onClickHandler = () => {
        onClick();
    }

    return (
        <button
            className      ={classes.btn} 
            onClick        ={onClickHandler} 
            onMouseEnter   ={onButtonHover} 
            onMouseLeave   ={onButtonHoverExit}>
            <div className={classes.animation} disabled={disabled}>
                {!disabled && <div className={classes.view}>
                    <div style={{transition: 'transform 0.3s', transform   : `translateX(${-slide}00%)`}} className={classes.slider}>
                        <div className={classes.purple}/>
                        <div className={classes.magenta}/>
                    </div>
                </div>}
            </div>
            <p id={disabled ? classes['btn-text-disabled'] : classes['btn-text']}>{title}</p>
        </button>
    );
}

export default SlideAnimiationButton