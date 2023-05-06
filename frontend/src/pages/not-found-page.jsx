import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";

const NotFound = lazy(() => import('../components/NotFound/NotFound.jsx'));
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