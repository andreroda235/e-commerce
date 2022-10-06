
import classes from './Grid.module.css';


export const GridItem = ({children}) => {
    return(
        <div className={classes.GridItem}>
            {children}
        </div>
    );
};


const Grid = ({children}) => {

    //scale items down with window size
    console.log(children);

    return (
        <div className={
            classes.container + ' ' +
            classes['container-columns']
        }>
            {children.map((child, index) => (
                <GridItem key={'GI' + index}>
                    {child}
                </GridItem>
            ))}
        </div>
    );
};

export default Grid;
