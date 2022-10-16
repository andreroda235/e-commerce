import { Link } from "react-router-dom";
import Card from "../shared/components/UIElements/Card";

import classes from './CategoryCard.module.css';


const CategoryCard = ({title, imgSrc, to}) => {

    return (
        <Card shadow className={classes.card}>
            <div className={classes.headline}>
                <h2 style={{fontSize: title.length > 22 ? '1.3rem' : '1.5rem'}}>{title}</h2>
            </div>
            <a href={to} className={classes.body}>
                <img src={imgSrc} alt={title}/>
            </a>
            <div className={classes.footer}>
               <Link className={classes.link} to={to} exact >Shop Now!</Link>
            </div>
        </Card>
    );
};

export default CategoryCard;