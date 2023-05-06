import React, {lazy, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";

const Completed = lazy(() => import('../components/Completed/Completed.jsx'));
const CompletedPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Completed/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default CompletedPage;