import { useState } from "react";
import Grid from "../shared/components/List/Grid";
import Card from "../shared/components/UIElements/Card";
import Page from "../shared/components/UIElements/Page";
import ShoppingItemCard from "../shopping/ShoppingItemCard";
import ShoppingPageBar from "../shopping/ShoppingPageBar";

import classes from './ShoppingPage.module.css';

const item = {
    imgSrc      : 'https://m.media-amazon.com/images/I/61JOiGPnVFL._AC_UY218_.jpg',
    title       : '2022 ASUS 14" HD Laptop',
    description : "Intel Celeron N4020 Processor, 4GB RAM, 64GB eMMC , Webcam, Intel HD Graphics 500, Bluetooth, Windows 11 S, Rose Gold, 128GB SnowBell USB Card",
    stock       : 20,
    discount    : 0.4,
    price       : 209.99,
    id          : 0
}

let items = [];
for(let i = 0; i < 24; i++){
    items.push(item);
}

const ShoppingPage = () => {

    const [showFilters, setShowFilters] = useState(true);

    const toggleFilterBar = () => {
        setShowFilters(prev => !prev);
    };


    return (
        <Page>
            <div className={classes.row}>
                {/* make this a separate component for a drawer */}
                {showFilters && 
                <div className={classes.filters}>
                    <Card className={classes.content}>
                        <label>One
                            <input type="checkbox" checked="checked"/>
                            <span></span>
                        </label>
                    </Card>
                </div>}
                <div className={classes.container}>
                    <ShoppingPageBar show={showFilters} toggleBar={toggleFilterBar}/>
                    <Grid>
                        {items.map((item, index) => 
                            <ShoppingItemCard
                                imgSrc      = {item.imgSrc}
                                title       = {item.title}
                                description = {item.description}
                                stock       = {item.stock + Math.round(Math.random()*(-item.stock))}
                                discount    = {Math.random()}
                                price       = {209.99}
                                id          = {index}
                            />
                        )}
                    </Grid>
                </div>
            </div>
        </Page>
    );
};

export default ShoppingPage;