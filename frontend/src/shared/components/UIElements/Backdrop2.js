import ReactDOM from 'react-dom';

import classes from './Backdrop2.module.css';
import { useEffect, useState } from 'react';

export const BackdropHook = ({children}) => {
    return <div className={classes.hook} id="backdrop-second-hook">
        {children}
    </div>;
};

const Backdrop2 = ({onClick}) => {

    const [hookReady, setHookReady] = useState(false);
    
    const content = <div className={classes.backdrop} onClick={onClick}></div>;

    useEffect(() => {
        if(!hookReady)
            setHookReady(true);
    }, [hookReady]);

    return (hookReady ? ReactDOM.createPortal(content, document.getElementById("backdrop-second-hook")) : <></>);
};

export default Backdrop2;