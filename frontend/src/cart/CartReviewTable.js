import { useSelector } from "react-redux";

import Card from "../shared/components/UIElements/Card";
import StockAlert from '../shopping/StockAlert';
import QuantityButton from '../shared/components/UIElements/Buttons/QuantityButton';

import removeIcon from '../assets/close-icon.png';

import classes from './CartReviewTable.module.css';


export const CartTableItem= ({thumbnail, title, price, quantity, stock}) => {
    
    const quantityChangeHandler = (value) => {
        console.log(value);
    };

    return (
        <tr>
            <td>
                <img id={classes.thumbnail} src={thumbnail} alt={title}/>
            </td>
            <td>
                <div className={classes.description}>
                    <p>{title}</p>
                    <StockAlert stock={stock}/>
                </div>
            </td>
            <td>
                <p className={classes.price}>{'$'+price}</p>
            </td>
            <td>
                <QuantityButton
                    onChange ={quantityChangeHandler}
                    min      ={1}
                    max      ={20}
                    step     ={1}
                />
            </td>
            <td>
                <p className={classes.total}>{'$' + price*quantity}</p>
            </td>
            <td>
                <img id={classes.remove} src={removeIcon} alt="x"/>
            </td>
        </tr>
    );
};

const CartReviewTable = () => {
    const cart = useSelector(state => state.cart);

    return (
        <Card className={classes.review}>
            <table>
                <thead>
                    <tr>
                        <td>Product</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map((item, index) => (
                        <CartTableItem
                            thumbnail ={item.thumbnail}
                            title     ={item.title}
                            price     ={item.price}
                            quantity  ={item.quantity}
                        />
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export default CartReviewTable;