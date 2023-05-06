import React, {lazy, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";
import New from "../components/New/New.jsx";

const New = lazy(() => import('../components/New/New.jsx'));
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
