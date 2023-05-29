import React, {lazy, Suspense} from 'react';
import LazyLoader from "@/components/MasterLayout/LazyLoader";
import MasterLayout from "@/components/MasterLayout/MasterLayout";
const Progress = lazy(() => import('@/components/Progress/Progress'));
const ProgressPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Progress/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ProgressPage;