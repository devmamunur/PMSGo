import React, {lazy, Suspense} from 'react';
import MasterLayout from "../app/components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const New = lazy(() => import('../app/components/New/New.jsx'));
const NewPage = () => {

    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <New/>
                </Suspense>
            </MasterLayout>
        </>
    );
}

export default NewPage;
