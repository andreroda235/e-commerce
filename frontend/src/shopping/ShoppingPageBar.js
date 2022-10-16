import Card from '../shared/components/UIElements/Card';

import classes from './ShoppingPageBar.module.css';

import filterIcon from '../assets/filter-icon.png';


const ShoppingPageBar = ({toggleBar, show}) => {

    const inputSelectHandler = (id, event) => {
        console.log(id, event.target.value);
    };

    const toggleFilterHandler = () => {
        toggleBar();
    };

    return (
        <Card className={classes.bar}>
            <button onClick={toggleFilterHandler}>
                <span>
                    {`${show ? 'Hide' : 'Show'} filters`}
                    <img src={filterIcon} alt=""/>
                </span>
            </button>
            <div>
                <label>
                    Products per page:
                    <select onChange={inputSelectHandler.bind(null,1)}>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                        <option value={48}>48</option>
                    </select>
                </label>
                <label>
                    Order by:
                    <select onChange={inputSelectHandler.bind(null,2)}>
                        <option value="rel">Relevance</option>
                        <option value="price,desc">Highest price</option>
                        <option value="price,asc">Lowest price</option>
                        <option value="new">Most recent</option>
                    </select>
                </label>
            </div>
        </Card>
    );
};

export default ShoppingPageBar;