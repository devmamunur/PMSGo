import React, {lazy, Suspense} from 'react';
import MasterLayout from "../app/components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const Completed = lazy(() => import('../app/components/Completed/Completed.jsx'));
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