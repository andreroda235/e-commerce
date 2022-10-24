
import { Children } from 'react';

import classes from './Grid.module.css';


export const GridItem = ({children}) => {
    return(
        <div className={classes.GridItem}>
            {children}
        </div>
    );
};


const Grid = ({children, bigGap, gridClass}) => {
    const count = Children.count(children);

    return (
        <div className={
            classes.container + ' ' +
            (gridClass || classes['container-columns']) + ' ' +
            (bigGap && classes['big-gap'])
        }>
            {count > 1 ? children.map((child, index) => (
                <GridItem key={'GI' + index}>
                    {child}
                </GridItem>
            )) : 
                <GridItem key={'GI1'}>
                    {children}
                </GridItem>
            }
        </div>
    );
};

export default Grid;
