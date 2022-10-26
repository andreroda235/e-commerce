import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {clearCart} from '../redux/cart-slice';

import Page from '../shared/components/UIElements/Page';
import Grid from '../shared/components/List/Grid';
import CartReviewTable from '../cart/CartReviewTable';
import Card from '../shared/components/UIElements/Card';
import SlideAnimiationButton from '../shared/components/UIElements/Buttons/SlideAnimationButton';

import classes from './CartReviewPage.module.css';

import arrowIcon from '../assets/arrow-icon-1174.png';
import trashIcon from '../assets/trash-icon.png';
import paymentsIcon from '../assets/paymemt-icons.png';
import couponIcon from '../assets/coupon-icon.png';
import cartIcon from '../assets/shopping_cart_icon_172223.png';


const CartReviewPage = () => {
    const cart     = useSelector(state => (state.cart));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toCheckoutHandler = () => {
        navigate('/shopping/checkout');
    };

    const returnToShoppingHandler = () => {
        navigate('/shopping');
    }

    const clearCartHandler = () => {
        dispatch(clearCart());
    };

    return (
        <Page>
            <Grid gridClass={classes.grid}>
                {cart.totalQuantity > 0 ? 
                <Grid gridClass={classes.rows}>
                    <CartReviewTable/>
                    <Card className={classes['bottom-menu']}>
                        <button onClick={returnToShoppingHandler} className={classes['go-back']}>
                            <img src={arrowIcon} alt="<"/>
                            <p>Back to Shoppping</p>
                        </button>
                        <button onClick={clearCartHandler} className={classes.clear}>
                            <img src={trashIcon} alt=""/>
                            <p>Clear Cart</p>
                        </button>
                    </Card>
                </Grid>
                :
                <Card className={classes['empty-cart']}>
                    <img src={cartIcon} alt="CART IS EMPTY"/>
                    <p>No items for review.</p>
                    <p>Please add items to your Cart.</p>
                </Card>}
                <div className={classes['cart-summary']}>
                    <Grid gridClass={classes['container-grid']}>
                        <Card className={classes.summary}>
                            <Grid gridClass={classes['grid-summary']}>
                                <h2>Summary</h2>
                                <div className={classes['summary-item']}>
                                    <p>{cart.totalQuantity + ' Products'}</p>
                                    <p>{'$' + (cart.totalPrice).toFixed(2)}</p>
                                </div>
                                <div className={classes['summary-item']}>
                                    <p>23% Taxes</p>
                                    <p>{'$' + (cart.totalPrice*0.23).toFixed(2)}</p>
                                </div>
                                <div className={classes['summary-item']}>
                                    <p>TOTAL</p>
                                    <p>{'$' + (cart.totalPrice.toFixed(2))}</p>
                                </div>
                                <SlideAnimiationButton 
                                title    ={'Checkout'}
                                onClick  ={toCheckoutHandler}
                                disabled ={cart.totalQuantity === 0}
                                />
                            </Grid>
                        </Card>
                        <Card className={classes.coupon}>
                            <div className={classes['group-coupon']}>
                                <img src={couponIcon} alt=""/>
                                <p>Discount code?</p>
                            </div>
                            <p>Insert your discount code when you checkout!</p>
                        </Card>
                        <Card className={classes.payment}>
                            <p>Payment Methods:</p>
                            <img src={paymentsIcon} alt="visa mastercard multibanco mbway"/>
                        </Card>
                    </Grid>
                </div>
            </Grid>
        </Page>
    );
};

export default CartReviewPage;