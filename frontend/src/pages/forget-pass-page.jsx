import React, {lazy, Suspense} from 'react';
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const ForgetPass = lazy(() => import('../app/components/ForgetPass/ForgetPass.jsx'));
const ForgetPassPage = () => {
    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <ForgetPass/>
            </Suspense>
        </>
    );
};

export default ForgetPassPage;