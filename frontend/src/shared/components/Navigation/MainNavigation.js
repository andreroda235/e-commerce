import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { toggleSideMenu } from "../../../redux/ui-slice";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import classes from './MainNavigation.module.css';

import logo from '../../../assets/e-commerce-logo.png';
import SideDrawerContent from "./SideDrawerContent";


const MainNavigation = () => {
    const drawerIsOpen = useSelector(state => state.ui.menu.sideMenuIsOpen);
    const auth         = useSelector(state => state.auth);
    const dispatch     = useDispatch();

    const toggleDrawerHandler = () => {
        dispatch(toggleSideMenu());
    };

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler}/>}
            <SideDrawer show={drawerIsOpen} left>
                <SideDrawerContent toggleDrawer={toggleDrawerHandler}/>
            </SideDrawer>
            <MainHeader key={window.location.pathname}>
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