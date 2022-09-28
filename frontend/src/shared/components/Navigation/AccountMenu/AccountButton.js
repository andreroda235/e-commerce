
import classes from './AccountButton.module.css';

import accountImg from '../../../../assets/account-default-pf.png';

const AccountButton = () => {
    return(
        <button className={classes.button}>
            <img src={accountImg} alt="Account"/>
        </button>
    );
};

export default AccountButton;