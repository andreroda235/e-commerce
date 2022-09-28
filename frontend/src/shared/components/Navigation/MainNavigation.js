import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import classes from './MainNavigation.module.css';

import logo from '../../../assets/e-commerce-logo.png';
import SideDrawerContent from "./SideDrawerContent";


const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const toggleDrawerHandler = () => {
        setDrawerIsOpen((prevState) => (!prevState));
    };

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler}/>}
            <SideDrawer show={drawerIsOpen}>
                <SideDrawerContent/>
            </SideDrawer>
            <MainHeader>
            <div className={classes['group-logo-menu']}>
                <button className={classes['menu-btn']} onClick={toggleDrawerHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={classes.logo}>
                    <Link to="/">
                        <img src={logo} alt="e-commerce"/>
                    </Link>

                </div>
            </div>
                <nav className={classes['header-nav']}>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNavigation;