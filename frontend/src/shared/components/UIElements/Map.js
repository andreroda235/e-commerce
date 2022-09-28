import React, { useEffect, useRef } from "react";

import classes from './Map.module.css';


const Map = ({className, style, center, zoom}) => {
    const mapRef = useRef();

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom
        });
    
        new window.google.maps.Marker({position: center, map: map})
    }, [center, zoom]);

    
    return (
        <div ref={mapRef} className={classes.map + ' ' + className} style={style}></div>
    );
};

export default Map;