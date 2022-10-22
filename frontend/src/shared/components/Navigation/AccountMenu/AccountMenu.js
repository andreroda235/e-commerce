import { useNavigate } from 'react-router-dom';
import classes from './AccountMenu.module.css';

export const MenuItem = ({item, link, logout}) => {

    const navigate = useNavigate();

    const itemClickHandler = () => {
        if(logout)
          return console.log(logout);
        navigate(link);
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
                {menuItems.map((item, index) => {
                    const logout = index === menuItems.length ? {logout: true} : {};
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