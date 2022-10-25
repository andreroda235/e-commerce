import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from './CartItem';
import SlideAnimiationButton from '../shared/components/UIElements/Buttons/SlideAnimationButton';

import classes from './CartDrawerContent.module.css';

import cartIcon from '../assets/shopping_cart_icon_172223.png';


const CartDrawerContent = () => {
    const cart      = useSelector((state) => state.cart);
    const cartEmpty = cart.items.length === 0;
    const navigate  = useNavigate();

    const toCheckoutHandler = () => {
        navigate('/shopping/checkout');
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
             <SlideAnimiationButton 
                title   ={'Checkout'}
                onClick ={toCheckoutHandler}
                />}
        </div>
    );
};

export default CartDrawerContent;