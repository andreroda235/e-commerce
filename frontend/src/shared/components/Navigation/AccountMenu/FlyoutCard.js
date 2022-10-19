
import Card from '../../UIElements/Card';
import AccountMenu from './AccountMenu';

import classes from './FlyoutCard.module.css';

const FlyoutCard = () => {
    return (
        <div className={classes.flyout}>
            <div className={classes['triangle--container']}>
                <div className={classes.triangle}/>
            </div>
            <Card className={classes.content}>
                <AccountMenu/>
            </Card>
        </div>
    );
};

export default FlyoutCard;