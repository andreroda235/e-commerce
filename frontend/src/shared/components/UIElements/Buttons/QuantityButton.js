import { useState } from 'react';

import classes from './QuantityButton.module.css';

const QuantityButton = ({onChange, min, max, step}) => {

    const [value, setValue] = useState(1);

    const valueChangeHandler = (event) => {
        onChange(event.target.value);
    };

    const changeValue = (value) => {
        //useReducer
        setValue((prev) => {
            const update = prev + value >= min && prev + value <= max ? prev + value : prev;
            onChange(update === prev ? 0 : value);
            return update;
        });
    }

    return (
        <div className={classes.quantity}>
            <button onClick={changeValue.bind(null, -step)}>-</button>
            <input
                value     ={value}
                type      ="number"
                id        ="inputNumber"
                onChange  ={valueChangeHandler}
                maxLength ={3}
                min       ={min}
                max       ={max}
            />
            <button onClick={changeValue.bind(null, step)}>+</button>
        </div>
    );
};

export default QuantityButton;