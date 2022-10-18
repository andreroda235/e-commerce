import classes from './StockAlert.module.css';

import stockIconRed from '../assets/stock-icons/stock-icon-red.png';
import stockIconYlw from '../assets/stock-icons/stock-icon-ylw.png';
import stockIconGreen from '../assets/stock-icons/stock-icon-green.png';

const StockAlert = ({stock}) => {

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

    return(
        <div className={classes.stock}>
            <img src={availableStock.icon} alt=""/>
            <h4 className={classes[availableStock.class]}>
                {availableStock.display}
            </h4>
        </div>
    );
};

export default StockAlert;