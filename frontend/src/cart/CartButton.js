/* import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice'; */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {toggleCart} from '../redux/ui-slice';

import SideDrawer from '../shared/components/Navigation/SideDrawer';
import Backdrop from '../shared/components/UIElements/Backdrop';
import CartDrawerContent from './CartDrawerContent';

import classes from './CartButton.module.css';

import cartIcon from '../assets/shopping_cart_icon_172223.png';


const CartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartIsOpen = useSelector((state) => state.ui.menu.cartIsOpen);
    const totalItems = useSelector((state) => state.cart.totalQuantity);
    const dispatch   = useDispatch();
    
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
        dispatch(toggleCart());
    }

    return (
        <>
          {cartIsOpen && <Backdrop onClick={toggleCartHandler}/>}
          <SideDrawer show={cartIsOpen}>
              <CartDrawerContent/>
          </SideDrawer>
          <button onClick={toggleCartHandler} className={btnClasses}>
              <span>
                  <img src={cartIcon} alt="Cart"/>
              </span>
              <div className={classes.badge}>{totalItems}</div>
          </button>
        </>
    );
};

export default CartButton;