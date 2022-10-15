import CategoryCard from "../shopping/CategoryCard";
import Carousel, { CarouselItem } from "../shared/components/Carousel/Carousel";
import Grid from "../shared/components/List/Grid";

const items = [
    'https://grazia.wwmindia.com/content/2018/oct/bodyc-rae1539588422.jpg',
    'https://img.freepik.com/free-photo/warehouse-worker-writing-down-inventory-report-products-large-storage-area_342744-1471.jpg?w=2000',
    'https://wallpaperaccess.com/full/1804570.jpg',
    'https://wallpapercave.com/wp/wp5599683.jpg',
    'https://files.northernbeaches.nsw.gov.au/sites/default/files/images/general-information/sports-associations/sports-associations.jpg',
    'https://wallpaperaccess.com/full/6032086.jpg'
]

const categories = [
    {
        title: 'Electronics',
        imgSrc: 'https://victormatara.com/wp-content/uploads/2021/05/List-Of-Best-Online-Electronic-Shops-In-Kenya-1200x720.jpg',
        to: '/search?=electronics'
    },
    {
        title: 'Deals',
        imgSrc: 'https://yb4ke1guf9g32qn4pnt1k17m-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/deal-sites.jpg',
        to: '/search?=Deals'
    },
    {
        title: 'Computers and Acessories',
        imgSrc: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg',
        to: '/search?=computers+acessories'
    },
    {
        title: 'Kitchen under 30$',
        imgSrc: 'https://img.fruugo.com/product/2/00/176297002_max.jpg',
        to: '/search?=kitchen<30'
    },
    {
        title: 'Clothing',
        imgSrc: 'https://static.euronews.com/articles/stories/06/48/94/10/1440x810_cmsv2_72145961-5fb7-5e54-852d-997299cf9e10-6489410.jpg',
        to: '/search?=elctronics'
    },
    {
        title: 'New',
        imgSrc: 'https://www.labelsetc.com/wp-content/uploads/2019/06/23-2.jpg',
        to: '/search?=new'
    },
    {
        title: 'Popular Now',
        imgSrc: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg',
        to: '/search?=elctronics'
    },
    {
        title: 'Video Games',
        imgSrc: 'https://worldwidevideogamers.com/wp-content/uploads/2022/04/9e3006ebb325382884f6ed0efb6eaf46.jpg',
        to: '/search?=elctronics'
    },
];

const HomePage = () => {

    return(
        <div className="page">
            <div style={{maxWidth: '1500px', position: 'relative', backgroundColor: 'white'}}>
                <Carousel
                    elements={items}
                    dataSize={items.length}
                    groupArrowPos="top"
                    groupArrowHeight={230}
                    snapBack
                    >
                    {items.map((item, index) => (
                        <CarouselItem key={'CI.' + index}>
                            <div className="center" style={{
                                width: '1500px', height: '600px', 
                                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) ${(230/600) * 100}%, rgba(255,255,255,1)), url(${item})`
                            }}/>
                        </CarouselItem>
                    ))}
                </Carousel>
                <div style={{backgroundColor: 'white', width: '100%', height: '1000px'}}/>
            </div>
            
            <div style={{width: '100%', height: 'fit-content', position: 'absolute', backgroundColor: 'transparent', top: '300px'}}>
                <Grid>
                    {categories.map((category) => (
                        <CategoryCard
                        title={category.title}
                        imgSrc={category.imgSrc}
                        to={category.to} 
                        />
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default HomePage;