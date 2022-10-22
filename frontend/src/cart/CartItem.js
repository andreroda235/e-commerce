import { useDispatch } from 'react-redux';

import { removeItem } from '../redux/cart-slice';

import classes from './CartItem.module.css';

import closeIcon from '../assets/close-icon.png';

const CartItem = ({index, id, title, quantity, price, thumbnail}) => {
    const dispatch = useDispatch();

    const removeItemHandler = () => {
        dispatch(removeItem(index));
    };

    return (
        <div className={classes.item}>
            <img src={thumbnail} alt={title}/>
            <div className={classes.info}>
                <p id={classes['cart-item-title']}>{title}</p>
                <h2>{'$' + price}</h2>
            </div>
            <p id={classes['cart-item-close']}>x</p>
            <div id={classes['cart-item-quantity']}>
                <p>{quantity}</p>
            </div>
            <button onClick={removeItemHandler}>
                <img src={closeIcon} alt=""/>
            </button>
        </div>
    );
};

export default CartItem;