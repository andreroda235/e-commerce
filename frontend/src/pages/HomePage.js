import Carousel, { CarouselItem } from "../shared/components/Carousel/Carousel";

const items = [
    'https://grazia.wwmindia.com/content/2018/oct/bodyc-rae1539588422.jpg',
    'https://img.freepik.com/free-photo/warehouse-worker-writing-down-inventory-report-products-large-storage-area_342744-1471.jpg?w=2000',
    'https://wallpaperaccess.com/full/1804570.jpg',
    'https://wallpapercave.com/wp/wp5599683.jpg',
    'https://files.northernbeaches.nsw.gov.au/sites/default/files/images/general-information/sports-associations/sports-associations.jpg',
    'https://wallpaperaccess.com/full/6032086.jpg'
]

const HomePage = () => {

    return(
        <div className="center" style={{width: '100%', height: 'fit-content'}}>
            <Carousel
                elements={items}
                dataSize={items.length}
                itemWidth={1500}
                visibleItems={1}
                groupArrowPos="top"
                groupArrowHeight={230}
                >
                {items.map((item, index) => (
                    <CarouselItem>
                        <div style={{
                            width: '1500px', height: '600px', 
                            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) ${(230/600) * 100}%, rgba(255,255,255,1)), url(${item})`
                        }}/>
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    );
};

export default HomePage;