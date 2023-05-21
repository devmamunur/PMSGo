import React, {lazy, Suspense} from 'react';
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";

const Completed = lazy(() => import('@/components/Completed/Completed'));
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