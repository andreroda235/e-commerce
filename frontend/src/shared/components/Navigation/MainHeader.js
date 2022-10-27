import React from "react";
import { Link, useLocation } from "react-router-dom";

import classes from './MainHeader.module.css';

import logo from '../../../assets/e-commerce-logo.png';

const MainHeader = ({children}) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';

    return !isAuthPage ? 
            <header className={classes['main-header']}>
                {children}
            </header>
        :
            <div className={classes.logo}>
                <Link to="/">
                    <img src={logo} alt="e-commerce"/>
                </Link>
            </div>;
};

export default MainHeader;