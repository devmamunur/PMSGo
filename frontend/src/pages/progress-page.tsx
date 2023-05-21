import React, {lazy, Suspense} from 'react';
import MasterLayout from "../app/components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const Progress = lazy(() => import('../app/components/Progress/Progress.jsx'));
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