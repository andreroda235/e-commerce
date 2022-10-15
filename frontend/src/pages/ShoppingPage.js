import ShoppingItemCard from "../shopping/ShoppingItemCard";

const ShoppingPage = () => {
    return (
        <div className="page">
            <ShoppingItemCard
            imgSrc='https://m.media-amazon.com/images/I/61JOiGPnVFL._AC_UY218_.jpg'
            title='2022 ASUS 14" HD Laptop'
            description="Intel Celeron N4020 Processor, 4GB RAM, 64GB eMMC , Webcam, Intel HD Graphics 500, Bluetooth, Windows 11 S, Rose Gold, 128GB SnowBell USB Card"
            stock={11}
            discount={0.4}
            price={209.99}
            id={0}
            />
        </div>
    );
};

export default ShoppingPage;