import PortalHook, { Hook } from "../../UIElements/PortalHook";

import classes from './AccountFlyout.module.css';


export const FlyoutHook = ({children}) => {
    return <Hook id="flyout-hook">{children}</Hook>;
};

const AccountFlyout = ({show, children}) => {

    return (
        <PortalHook classNames={classes.flyout} show={show} id="flyout-hook">
            {children}
        </PortalHook>
    );
}; 

export default AccountFlyout;