import React from 'react';
import {useSelector} from "react-redux";


const FullScreenLoader = () => {
    return (
        <>
            <div className="LoadingOverlay d-none">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </>
    );
};

export default FullScreenLoader;