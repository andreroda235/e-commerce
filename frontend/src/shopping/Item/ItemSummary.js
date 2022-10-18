import Card from '../../shared/components/UIElements/Card';
import StockAlert from '../StockAlert';
import CustomButton from '../../shared/components/UIElements/Buttons/CustomButton';

import classes from './ItemSummary.module.css';
import Grid from '../../shared/components/List/Grid';
import QuantityButton from '../../shared/components/UIElements/Buttons/QuantityButton';

const ItemSummary = ({title, price, stock, description}) => {

    const quantityChangeHandler = (value) => {
        console.log(value);
    };

    return (
        <Card className={classes.summary}>
            <Grid gridClass={classes.grid}>
                <h1>{title}</h1>
                <h2>{'$' + price}</h2>
                <StockAlert stock={stock}/>
                <div className={classes['btn-group']}>
                    <div className={classes['btn-group-qt']}>
                        <QuantityButton
                            min      ={1}
                            max      ={20}
                            step     ={1} 
                            onChange ={quantityChangeHandler}/>
                        <CustomButton nowrap stretch>Add to Cart</CustomButton>
                    </div>
                    <CustomButton danger nowrap stretch>Buy Now!</CustomButton>
                </div>
                <p>{description}</p>
            </Grid>
        </Card>
    );
};

export default ItemSummary;