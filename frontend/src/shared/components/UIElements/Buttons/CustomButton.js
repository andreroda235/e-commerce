import classes from "./CustomButton.module.css";

import arrowIcon from "../../../../assets/arrow-icon-1174.png";

let inactive = 0;

const CustomButton = ({
    text,
    href,
    size,
    fitParentH,
    fitParentW,
    arrow,
    inverse,
    flip,
    danger,
    to,
    exact,
    type,
    onClick,
    disabled,
    timeout,
    children,
}) => {


    const clickHandler = () => {
        if(timeout){
            if(!inactive){
                inactive = setTimeout(() => {
                    clearTimeout(inactive); 
                    inactive = 0
                }, timeout);
                onClick();
            }
            return;
        }
        onClick();
    };

    if (arrow)
        return (
            <button
                className={
                classes["arrow-button"] + " " +
                classes[`arrow-button--${size || "default"}`] + " " +
                classes[`${flip && "arrow-button--flip"}`]
                }
                onClick={clickHandler}
                style={{ height: fitParentH ? "100%" : "fit-content" }}
                disabled={disabled}
            >
                <img src={arrowIcon} alt=">" />
            </button>
        );

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

export default CustomButton;
