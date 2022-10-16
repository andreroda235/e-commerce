
import { useState } from 'react';

import wishlistEmptyIcon from '../../../../assets/wishlist/wishlist-empty.png';
import wishlistFullIcon from '../../../../assets/wishlist/wishlist-full.png';

import classes from './WishlistButton.module.css';

const WishlistButton = ({onClick}) => {

    const [isClicked, setIsClicked] = useState(false);

    const wishlistClickHandler = () => {
        setIsClicked(prev => !prev);
        if(!isClicked)
        /* onClick(); */
        console.log('Wishlisted!');
    };

    return (
        <button 
            className={classes.button} 
            onClick={wishlistClickHandler}>
            <img src={isClicked ? wishlistFullIcon : wishlistEmptyIcon} alt="wishlist"/>
        </button>
    );
};

export default WishlistButton