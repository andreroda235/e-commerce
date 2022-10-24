import { useSelector } from 'react-redux';

import Page from '../shared/components/UIElements/Page';
import Grid from '../shared/components/List/Grid';
import CartReviewTable from '../cart/CartReviewTable';
import Card from '../shared/components/UIElements/Card';

import classes from './CartReviewPage.module.css';

import arrowIcon from '../assets/arrow-icon-1174.png';
import trashIcon from '../assets/trash-icon.png';
import SlideAnimiationButton from '../shared/components/UIElements/Buttons/SlideAnimationButton';

const CartReviewPage = () => {
    const cart = useSelector(state => (state.cart));

    const toCheckoutHandler = () => {
        console.log('checkout');
    };

    return (
        <Page>
            <Grid gridClass={classes.grid}>
                <Grid gridClass={classes.rows}>
                    <CartReviewTable/>
                    <Card className={classes['bottom-menu']}>
                        <button className={classes['go-back']}>
                            <img src={arrowIcon} alt="<"/>
                            <p>Back to Shoppping</p>
                        </button>
                        <button className={classes.clear}>
                            <img src={trashIcon} alt=""/>
                            <p>Clear Cart</p>
                        </button>
                    </Card>
                </Grid>
                <div className={classes['cart-summary']}>
                    <Card className={classes.summary}>
                        <h2>Summary</h2>
                        <div className={classes['summary-item']}>
                            <p>{cart.totalQuantity + ' Products'}</p>
                            <p>{'$' + cart.totalPrice}</p>
                        </div>
                        <div className={classes['summary-item']}>
                            <p>23% Taxes</p>
                            <p>{'$' + (cart.totalPrice + cart.totalPrice*0.23).toFixed(2)}</p>
                        </div>
                        <div className={classes['summary-item']}>
                            <p>TOTAL</p>
                            <p>{'$' + cart.totalPrice}</p>
                        </div>
                        <SlideAnimiationButton 
                        title   ={'Checkout'}
                        onClick ={toCheckoutHandler}
                        />
                    </Card>
                </div>
            </Grid>
        </Page>
    );
};

export default CartReviewPage;