import React, {lazy, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";

const Progress = lazy(() => import('../components/Progress/Progress.jsx'));
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