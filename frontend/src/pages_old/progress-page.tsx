import React, {lazy, Suspense} from 'react';
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";

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