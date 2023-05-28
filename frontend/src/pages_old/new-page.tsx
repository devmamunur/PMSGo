import React, {lazy, Suspense} from 'react';
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";

const New = lazy(() => import('@/components/New/New'));
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
