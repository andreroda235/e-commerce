import { useState } from 'react';

import classes from './SlideAnimationButton.module.css';


const SlideAnimiationButton = ({title, onClick}) => {
    const [slide, setSlide] = useState(0);

    const onButtonHover = () => {
        setSlide(1);
    };

    const onButtonHoverExit = () => {
        setSlide(0);
    };

    const onCLickHandler = () => {
        onClick();
    }

    return (
        <div className={classes.btn} onMouseEnter={onButtonHover} onMouseLeave={onButtonHoverExit}>
            <button onClick={onCLickHandler}>
                <div className={classes.view}>
                    <div style={{transition: 'transform 0.3s', transform   : `translateX(${-slide}00%)`}} className={classes.slider}>
                        <div className={classes.purple}/>
                        <div className={classes.magenta}/>
                    </div>
                </div>
            </button>
            <p id={classes['btn-text']}>{title}</p>
        </div>
    );
}

export default SlideAnimiationButton