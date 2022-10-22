import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import Card from '../../shared/components/UIElements/Card';
import StockAlert from '../StockAlert';
import CustomButton from '../../shared/components/UIElements/Buttons/CustomButton';
import Grid from '../../shared/components/List/Grid';
import QuantityButton from '../../shared/components/UIElements/Buttons/QuantityButton';

import classes from './ItemSummary.module.css';
import { addItem } from '../../redux/cart-slice';

const ItemSummary = ({title, price, stock, discount, description, id, thumbnail}) => {

    const dispatch = useDispatch();
    const quantity = useRef(1);
    
    console.log(price + ' ' + discount);

    const quantityChangeHandler = (value) => {
        quantity.current += value;
    };

    const addToCartHandler = () => {
        dispatch(addItem({
            id        : id,
            quantity  : quantity.current,
            price     : price,
            title     : title,
            thumbnail : thumbnail
        }));
    };

    return (

        <Card className={classes.summary}>
            <Grid gridClass={classes.grid}>
                <h1>{title}</h1>
                <h2>{'$' + (price - discount*price).toFixed(2)}</h2>
                <StockAlert stock={stock}/>
                <div className={classes['btn-group']}>
                    <div className={classes['btn-group-qt']}>
                        <QuantityButton
                            min      ={1}
                            max      ={20}
                            step     ={1} 
                            onChange ={quantityChangeHandler}/>
                        <CustomButton nowrap stretch onClick={addToCartHandler}>Add to Cart</CustomButton>
                    </div>
                    <CustomButton danger nowrap stretch>Buy Now!</CustomButton>
                </div>
                <p>{description}</p>
            </Grid>
        </Card>
    );
};

export default ItemSummary;