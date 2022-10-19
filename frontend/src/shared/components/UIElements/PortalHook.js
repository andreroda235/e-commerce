import { useEffect, useState } from "react";
import ReactDOM from "react-dom";


import classes from './PortalHook.module.css';

export const Hook = ({children, id}) => {
    return <div id={id}>{children}</div>;
};

const PortalHook = ({children, show, classNames, id, onClick}) => {
    const [hookReady, setHookReady] = useState(false);
    
    const content = <div onClick={onClick} className={classNames + ' ' + (!show && classes.invisible)}>{children}</div>;

    useEffect(() => {
        if(!hookReady)
            setHookReady(true);
    }, [hookReady]);

    return (hookReady ? ReactDOM.createPortal(content, document.getElementById(id)) : <></>);
};

export default PortalHook;