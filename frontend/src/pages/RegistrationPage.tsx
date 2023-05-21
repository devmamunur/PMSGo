"use client"
import React, {lazy, Suspense} from 'react';
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const Registration = lazy(() => import('../app/components/Registration/Registration'));
const RegistrationPage = () => {
    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <Registration/>
            </Suspense>
        </>
    );
};

export default RegistrationPage;