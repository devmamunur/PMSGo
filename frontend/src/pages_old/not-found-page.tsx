import React, {lazy, Suspense} from 'react';
import LazyLoader from "@/components/MasterLayout/LazyLoader";

const NotFound = lazy(() => import('@/components/NotFound/NotFound'));
const NotFoundPage = () => {
    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <NotFound/>
            </Suspense>
        </>
    );
};

export default NotFoundPage;