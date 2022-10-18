import Card from '../../shared/components/UIElements/Card';
import Grid from '../../shared/components/List/Grid';

import classes from './ItemPhotos.module.css';

export const ItemPhotosItem = ({children, src}) => {
    return (
        <div className={classes.item}>
            <img src={src} alt=""/>
        </div>
    );
};

const ItemPhotos = ({children}) => {
    return (
        <Card className={classes.photos}>
            <Grid gridClass={classes.grid} bigGap>
                {children}
            </Grid>
        </Card>
    );
};

export default ItemPhotos;