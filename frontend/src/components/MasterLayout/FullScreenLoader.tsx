import React from 'react';
import {useSelector} from "react-redux";


const FullScreenLoader = () => {
    const  loader = useSelector((state) => state.settings.loader);
    return (
        <>
            <div className={loader + " LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </>
    );
};

export default FullScreenLoader;