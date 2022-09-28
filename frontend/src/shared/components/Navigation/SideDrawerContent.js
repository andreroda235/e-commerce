
import classes from './SideDrawerContent.module.css'
import SideDrawerItem from './SideDrawerItem';

const departments = [
    'Electronics',
    'Computers',
    'Smart Home',
    'Arts & Crafts',
    'Home and Kichen',
    'Software',
    'Movies & Television',
    'Video Games',
    'Sports and Outdoors',
    'Tools and Home Improvement'
];

const SideDrawerContent = () => {

    const slideHandler = (id) => {
        console.log(id);
    };


    return(
        <>
            <div className={classes.content}>
                <div className={classes.account}>
                    <h1>Hello, user!</h1>
                </div>
                <ul>
                    {departments.map((item, index) => (
                        <SideDrawerItem
                        key={index}
                        id={index}
                        tag={item}
                        clickItem={slideHandler}
                        />
                    ))}
                </ul>
                <hr />
                <h1>Settings & Help</h1>
                <p>Your Account</p>
                <p>Logout</p>
            </div>
            {

            }
        </>
    );
};

export default SideDrawerContent;