import React, {lazy, Suspense} from 'react';
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";

const Create = lazy(() => import('@/components/Create/Create'));
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