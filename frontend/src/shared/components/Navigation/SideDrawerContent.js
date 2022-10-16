
import { useState } from 'react';
import classes from './SideDrawerContent.module.css'
import SideDrawerItem from './SideDrawerItem';

import arrowIcon from '../../../assets/arrow-icon-1174.png';

const departments = [
    {
        category: 'Electronics',
        subCategories: [
            'Accessories & Supplies',
            'Camera & Photo',
            'Car & Vehicle Electronics',
            'Computers & Accessories',
            'Wearable Technology'
        ]
    },
    {
        category: 'Computers',
        subCategories: []
    },
    {
        category: 'Smart Home',
        subCategories: []
    },
    {
        category: 'Arts & Crafts',
        subCategories: []
    },
    {
        category: 'Home and Kichen',
        subCategories: []
    },
    {
        category: 'Software',
        subCategories: []
    },
    {
        category: 'Movies & Television',
        subCategories: []
    },
    {
        category: 'Video Games',
        subCategories: []
    },
    {
        category: 'Sports and Outdoors',
        subCategories: []
    },
    {
        category: 'Tools and Home Improvement',
        subCategories: []
    },
];

const SideDrawerContent = ({toggleDrawer}) => {

    const [toggle, setToggle] = useState(0);
    const [category, setCategory] = useState(0);

    const slideHandler = (id) => {
       setToggle(prev => prev === 1 ? 0 : 1);
       setCategory(id);
    };

    return(
        <>
            <div className={classes.content}>
                <div className={classes.account}>
                    <h1>Hello, user!</h1>
                </div>
                <div className={classes.viewport}>
                    <div className={classes.slider}
                    style={{transition: 'transform 0.3s',transform   : `translateX(${-toggle}00%)`}}>
                        <div className={classes['slider-item']}>
                            <ul>
                                {departments.map((item, index) => (
                                    <SideDrawerItem
                                    key={'c' + index}
                                    id={index}
                                    tag={item.category}
                                    clickItem={slideHandler}
                                    />
                                ))}
                            </ul>
                            <hr />
                            <h1>Settings & Help</h1>
                            <p>Your Account</p>
                            <p>Logout</p>
                        </div>
                        <div className={classes['slider-item']}>
                            <div className={classes.back}>
                                <img src={arrowIcon} alt="back"/>
                                <h3 className={classes.back} onClick={() => (setToggle(0))}>{'Back'}</h3>
                            </div>
                            <hr />
                            <ul>
                            {departments[category].subCategories.map((item, index) => (
                                <SideDrawerItem
                                key={'sc' + index}
                                id={index}
                                tag={item}
                                clickItem={slideHandler}
                                link={'/shopping/' + departments[category].category + '/' + item}
                                toggleDrawer={toggleDrawer}
                                />
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideDrawerContent;