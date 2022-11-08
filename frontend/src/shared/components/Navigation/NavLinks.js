import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

/* import {AuthContext} from '../../context/auth-context';
*/
import CartButton from "../../../cart/CartButton";
import AccountButton from "./AccountMenu/AccountButton";

import classes from './NavLinks.module.css'

const NavLinks = () => {
    const auth = useSelector(state => state.auth);

    return (
        <ul className={classes['nav-links']}>
            {!auth.isLoggedIn && auth.admin && <li>
                <NavLink to='/admin'>Admin</NavLink>
            </li>}
            <li>
                <CartButton/>
            </li>
            {!auth.isLoggedIn && <li>
                <NavLink to='/auth'>Sign in</NavLink>
            </li>}
            {auth.isLoggedIn && <li>
                <AccountButton/>
            </li>}
        </ul>
    );
};

export default NavLinks;