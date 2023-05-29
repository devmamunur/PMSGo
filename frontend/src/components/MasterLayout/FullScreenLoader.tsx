"use client"
import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";


const FullScreenLoader : React.FC = () => {
    const  loader = useSelector((state : RootState) => state.settings.loader);
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