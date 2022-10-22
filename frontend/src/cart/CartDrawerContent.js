import { useSelector } from 'react-redux';

import CartItem from './CartItem';

import classes from './CartDrawerContent.module.css';

import cartIcon from '../assets/shopping_cart_icon_172223.png';
import { useState } from 'react';


const CartDrawerContent = () => {
    const [slide, setSlide] = useState(0);

    const cart = useSelector((state) => state.cart);
    const cartEmpty = cart.items.length === 0;

    const onButtonHover = () => {
        setSlide(1);
    };

    const onButtonHoverExit = () => {
        setSlide(0);
    };

    return (
        <div className={classes.content}>
            <div className={classes.banner}>
                <img src={cartIcon} alt="Cart"/>
            </div>
                {cartEmpty && <p>No items yet!</p>}
            {!cartEmpty && 
            <ul>
                <hr/>
                {cart.items.map((item, index) => (
                    <>
                        <CartItem
                            key       ={'cart-item ' + index}
                            index     ={index}
                            id        ={item.id}
                            title     ={item.title}
                            quantity  ={item.quantity}
                            price     ={item.price}
                            thumbnail ={item.thumbnail}
                        />
                        <hr/>
                    </>
                ))}
            </ul>}
            {!cartEmpty && 
            <div className={classes.checkout} onMouseEnter={onButtonHover} onMouseLeave={onButtonHoverExit}>
                    <button>
                        <div className={classes.view}>
                            <div style={{transition: 'transform 0.3s', transform   : `translateX(${-slide}00%)`}} className={classes.slider}>
                                <div className={classes.purple}/>
                                <div className={classes.magenta}/>
                            </div>
                        </div>
                    </button>
                    <p id={classes['checkout-text']}>Checkout</p>
            </div>}
        </div>
    );
};

export default CartDrawerContent;