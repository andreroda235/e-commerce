/* import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice'; */
import { useEffect, useState } from 'react';

import SideDrawer from '../shared/components/Navigation/SideDrawer';
import Backdrop from '../shared/components/UIElements/Backdrop';
import CartDrawerContent from './CartDrawerContent';

import classes from './CartButton.module.css';

import cartIcon from '../assets/shopping_cart_icon_172223.png';
import { useSelector } from 'react-redux';


const CartButton = (props) => {
    /* const dispatch = useDispatch();
    const totalItems = useSelector(state => state.cart.totalQuantity); */
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const totalItems = useSelector((state) => state.cart.totalQuantity);
    
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
      setCartIsOpen((prevState) => (!prevState));
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
              <span className={classes.badge}>{totalItems}</span>
          </button>
        </>
    );
};

export default CartButton;