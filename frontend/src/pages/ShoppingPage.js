import Grid from "../shared/components/List/Grid";
import ShoppingItemCard from "../shopping/ShoppingItemCard";

const item = {
    imgSrc      : 'https://m.media-amazon.com/images/I/61JOiGPnVFL._AC_UY218_.jpg',
    title       : '2022 ASUS 14" HD Laptop',
    description : "Intel Celeron N4020 Processor, 4GB RAM, 64GB eMMC , Webcam, Intel HD Graphics 500, Bluetooth, Windows 11 S, Rose Gold, 128GB SnowBell USB Card",
    stock       : 11,
    discount    : 0.4,
    price       : 209.99,
    id          : 0
}

let items = [];
for(let i = 0; i < 24; i++){
    items.push(item);
}

const ShoppingPage = () => {
    return (
        <div className="page">
        <Grid>
            {items.map((item, index) => 
                <ShoppingItemCard
                    imgSrc      = {item.imgSrc}
                    title       = {item.title}
                    description = {item.description}
                    stock       = {item.stock + Math.round(Math.random()*(-11))}
                    discount    = {Math.random()}
                    price       = {209.99}
                    id          = {index}
                />
            )}
        </Grid>
        </div>
    );
};

export default ShoppingPage;