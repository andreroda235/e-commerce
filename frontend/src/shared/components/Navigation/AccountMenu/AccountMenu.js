import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './AccountMenu.module.css';

export const MenuItem = ({item, link, signout}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const itemClickHandler = () => {
        if(signout){
            dispatch({type: 'logout'});
            navigate(link);
        }
    };

    return (
        <li onClick={itemClickHandler} className={classes.item}>
            <p>{item}</p>
        </li>
    );
};


const menuItems = [
    {
        item: 'Account',
        link: '/user/account'
    },
    {
        item: 'Settings',
        link: '/settings'
    },
    {
        item: 'Logout',
        link: '/'
    },
];


const AccountMenu = () => {
    return (
        <div className={classes.menu}>
            <ul>
                {/* separate these manually instead of mapping */}
                {menuItems.map((item, index) => {
                    const logout = index === menuItems.length -1 ? {signout: true} : {};
                    return <MenuItem
                                key  ={'account-menu' + index}
                                item ={item.item}
                                link ={item.link}
                                {...logout}
                            />
                })}
            </ul>
        </div>
    );
};

export default AccountMenu;