import Grid from "../shared/components/List/Grid";
import ItemDetails from "../shopping/Item/ItemDetails";
import ItemPhotos, { ItemPhotosItem } from "../shopping/Item/ItemPhotos";
import ItemSummary from "../shopping/Item/ItemSummary";

import classes from './ItemDetailPage.module.css';

const photos = [
    'https://static.pcdiga.com/media/catalog/product/cache/4a9972e1440204cef7cf19ceb7c4fc35/a/s/asus-x515_m515_product-photo_1s_transparent-silver_13.jpg',
    'https://static.pcdiga.com/media/catalog/product/cache/4a9972e1440204cef7cf19ceb7c4fc35/a/s/asus-x515_m515_product-photo_1s_transparent-silver_05.jpg',
    'https://static.pcdiga.com/media/catalog/product/cache/4a9972e1440204cef7cf19ceb7c4fc35/a/s/asus-x515_m515_product-photo_1s_transparent-silver_12.jpg',
    'https://static.pcdiga.com/media/catalog/product/cache/4a9972e1440204cef7cf19ceb7c4fc35/s/e/sem-t_tulo-3_1.jpg'
];

const item = {
    imgSrc      : 'https://m.media-amazon.com/images/I/61JOiGPnVFL._AC_UY218_.jpg',
    title       : '2022 ASUS 14" HD Laptop',
    description : "Intel Celeron N4020 Processor, 4GB RAM, 64GB eMMC , Webcam, Intel HD Graphics 500, Bluetooth, Windows 11 S, Rose Gold, 128GB SnowBell USB Card",
    stock       : 20,
    discount    : 0.4,
    price       : 209.99,
    id          : 0
}

const ItemDetailPage = () => {
    return (
        <div className={"page " + classes.page}>
            <Grid gridClass={classes.grid}>
                <ItemPhotos>
                    {photos.map((photo, index)=> (
                        <ItemPhotosItem src={photo}/>
                    ))}
                </ItemPhotos>
                <div className={classes.summary}>
                    <ItemSummary
                        title       = {item.title}
                        price       = {item.price}
                        stock       = {item.stock}
                        description = {item.description}
                    />
                </div>
                <ItemDetails/>
            </Grid>
        </div>
    );
};

export default ItemDetailPage;