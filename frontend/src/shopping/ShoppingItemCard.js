import { useNavigate } from "react-router-dom";

import Card from "../shared/components/UIElements/Card";
import WishlistButton from "../shared/components/UIElements/Buttons/WishlistButton";
import StockAlert from "./StockAlert";

import classes from './ShoppingItemCard.module.css';


const ShoppingItemCard = ({imgSrc, title, stock, discount, description, price, id}) => {
    const navigate = useNavigate();

    const itemClickHandler = () => {
        navigate('/shopping/item-detail/' + id);
    };

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
                    <StockAlert stock={stock}/>
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