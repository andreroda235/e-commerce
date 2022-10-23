import { useDispatch, useSelector } from 'react-redux';

import { toggleAccMenu } from '../../../../redux/ui-slice';

import AccountFlyout from './AccountFlyout';
import Backdrop2 from '../../UIElements/Backdrop2';

import classes from './AccountButton.module.css';

import accountImg from '../../../../assets/account-default-pf.png';
import FlyoutCard from './FlyoutCard';

const AccountButton = () => {
const showFlyout = useSelector((state) => state.ui.menu.accountMenuIsOpen);
const dispatch   = useDispatch();

    const toggleFlyoutHandler = () => {
        dispatch(toggleAccMenu());
    };

    return(
        <>
        {showFlyout && <Backdrop2 onClick={toggleFlyoutHandler}/>}
          <AccountFlyout show={showFlyout}>
              <FlyoutCard/>
          </AccountFlyout>
        <button onClick={toggleFlyoutHandler}  className={classes.button}>
            <img src={accountImg} alt="Account"/>
        </button>
        </>
    );
};

export default AccountButton;