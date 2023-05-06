import React, {lazy, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";

const Canceled = lazy(() => import('../components/Canceled/Canceled.jsx'));
const CanceledPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Canceled/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default CanceledPage;