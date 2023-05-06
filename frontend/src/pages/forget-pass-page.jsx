import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";

const ForgetPass = lazy(() => import('../components/ForgetPass/ForgetPass.jsx'));
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