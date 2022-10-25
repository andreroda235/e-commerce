import { useDispatch, useSelector } from "react-redux";

import Card from "../shared/components/UIElements/Card";
import StockAlert from '../shopping/StockAlert';
import QuantityButton from '../shared/components/UIElements/Buttons/QuantityButton';

import removeIcon from '../assets/close-icon.png';

import classes from './CartReviewTable.module.css';
import { decreaseQuantity, increaseQuantity, removeItem } from "../redux/cart-slice";


export const CartTableItem= ({thumbnail, title, price, quantity, stock, index}) => {
    const dispatch = useDispatch();
    
    const quantityChangeHandler = (value) => {
        dispatch(value > 0 ? increaseQuantity(index) : decreaseQuantity(index));
    };

    const removeItemHandler = () => {
        dispatch(removeItem(index));
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
                    onChange     ={quantityChangeHandler}
                    min          ={1}
                    max          ={20}
                    step         ={1}
                    initialValue ={quantity}
                />
            </td>
            <td>
                <p className={classes.total}>{'$' + price*quantity}</p>
            </td>
            <td>
                <button onClick={removeItemHandler} id={classes.remove}>
                    <img src={removeIcon} alt="x"/>
                </button>
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
                            index     ={index}
                        />
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export default CartReviewTable;