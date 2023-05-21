import React, {lazy, Suspense} from 'react';
import MasterLayout from "../app/components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const Create = lazy(() => import('../app/components/Create/Create.jsx'));
const CreatePage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Create/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default CreatePage;