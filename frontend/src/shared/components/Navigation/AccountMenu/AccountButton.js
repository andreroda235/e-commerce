import { useState } from 'react';

import AccountFlyout from './AccountFlyout';
import Backdrop2 from '../../UIElements/Backdrop2';

import classes from './AccountButton.module.css';

import accountImg from '../../../../assets/account-default-pf.png';
import FlyoutCard from './FlyoutCard';

const AccountButton = () => {
const [showFlyout, setShowFlyout] = useState(false);

    const toggleFlyoutHandler = () => {
        setShowFlyout(prev => !prev);
    };

    return(
        <>
        {showFlyout && <Backdrop2 onClick={toggleFlyoutHandler}/>}
          <AccountFlyout show={showFlyout}>
              <FlyoutCard/>
          </AccountFlyout>
        <button onClick={toggleFlyoutHandler} className={classes.button}>
            <img src={accountImg} alt="Account"/>
        </button>
        </>
    );
};

export default AccountButton;