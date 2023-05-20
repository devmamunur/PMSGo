import React, {lazy, Suspense} from 'react';
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const NotFound = lazy(() => import('../app/components/NotFound/NotFound.jsx'));
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