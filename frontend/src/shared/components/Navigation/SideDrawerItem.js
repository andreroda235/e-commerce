import { useNavigate } from 'react-router-dom';

import classes from './SideDrawerItem.module.css';

import arrowIcon from '../../../assets/arrow-icon-1174.png';

const SideDrawerItem = ({ tag, id, clickItem, link, toggleDrawer}) => {
    const navigate = useNavigate();

    const drawerItemClickHandler = () => {
        if(link){
            //maybe context to toggle the drawer or do this in levels above
            toggleDrawer();
            return navigate(link);
        }

        clickItem(id);
    };

    return (
        <li className={classes.item} onClick={drawerItemClickHandler}>
            <p>{tag}</p>
            <img src={arrowIcon} alt="go to"/>
        </li>
    );
};

export default SideDrawerItem;