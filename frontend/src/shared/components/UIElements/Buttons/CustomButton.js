import classes from './CustomButton.module.css';

import arrowIcon from '../../../../assets/arrow-icon-1174.png';



const CustomButton = ({ type, onClick, inverted, height }) => {

    const clickHandler = () => {
        onClick();
    };

    return (
        <button 
            className={classes['arrow-button']} 
            onClick={clickHandler}
            style={{height: height ? height : 'fit-content'}}
        >
            <img src={arrowIcon} alt=">"/>
        </button>
    );
};

export default CustomButton;