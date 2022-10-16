import Card from "../shared/components/UIElements/Card";
import WishlistButton from "../shared/components/UIElements/Buttons/WishlistButton";

import classes from './ShoppingItemCard.module.css';

import stockIconGreen from '../assets/stock-icons/stock-icon-green.png';
import stockIconRed from '../assets/stock-icons/stock-icon-red.png';
import stockIconYlw from '../assets/stock-icons/stock-icon-ylw.png';

const ShoppingItemCard = ({imgSrc, title, stock, discount, description, price, id}) => {

    const itemClickHandler = () => {
        console.log(id + ' clicked');
    };

    let availableStock = {
        display : 'In Stock', 
        class   : 'stocked',
        icon    : stockIconGreen
    };
    if(stock <= 10 && stock > 0){
        availableStock.display  = 'Only ' + stock + ' left!';
        availableStock.class    = 'few';
        availableStock.icon     = stockIconYlw
    }
    if(stock === 0){
        availableStock.display  = 'Unavailable';
        availableStock.class    = 'unavailable';
        availableStock.icon     = stockIconRed
    }

    let discountClass;
    if(discount >= 0.2 && discount <= 0.4)
        discountClass = 'super-discount';
    else if(discount > 0.4)
        discountClass = 'mega-discount';
    
    return (
        <div className={classes.container} onClick={itemClickHandler}>
            <Card className={classes.card}>
                <div className={classes.header}>
                    {discount < 1 &&
                    <div className={
                            classes.discount + ' ' +
                            classes[discountClass] + ' ' +
                            (stock === 0 && classes['grey-discount'])
                            }>
                        <p>{(discount*100).toFixed(0)}%</p>
                    </div>}
                    <img src={imgSrc} alt={title}/>
                </div>
                <div className={classes.body}>
                    <h3 onClick={itemClickHandler}>{title}</h3>
                    <div className={classes.description}>
                        <p>{description}</p>
                    </div>
                    <div className={
                        classes.stock + ' ' +
                        classes['center-row']
                        }>
                        <img src={availableStock.icon} alt=""/>
                        <h4 className={classes[availableStock.class]}>
                            {availableStock.display}
                        </h4>
                    </div>
                    <div 
                        className={classes['center-row'] + ' ' + 
                        classes.price + ' ' + 
                        (stock === 0 && classes['price-gray'])}
                    >
                        <h2>${(price - discount*price).toFixed(2)}</h2>
                        {discount < 1 && <p>${price}</p>}
                    </div>
                </div>
                <div className={classes.footer}>
                    <WishlistButton disabled={stock === 0}/>
                </div>
            </Card>
        </div>
    );
};

export default ShoppingItemCard;