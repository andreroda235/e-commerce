/* import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice'; */
import { useEffect, useState } from 'react';

import cartIcon from '../assets/shopping_cart_icon_172223.png';

import classes from './CartButton.module.css';

const CartButton = (props) => {
    /* const dispatch = useDispatch();
    const totalItems = useSelector(state => state.cart.totalQuantity); */
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const totalItems = 4;
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (totalItems.length === 0) {
          return;
        }
        setBtnIsHighlighted(true);
    
        const timer = setTimeout(() => {
          setBtnIsHighlighted(false);
        }, 300);
    
        return () => {
          clearTimeout(timer);
        };
      }, [totalItems]);


    const toggleCartHandler = () => {
        /* dispatch(uiActions.toggleCart()); */
    }


    return (
        <button onClick={toggleCartHandler} className={btnClasses}>
            <span>
                <img src={cartIcon} alt="Cart"/>
            </span>
            <span className={classes.badge}>{totalItems}</span>
        </button>
    );
};

export default CartButton;