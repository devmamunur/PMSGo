import React, {lazy, Suspense} from 'react';
import MasterLayout from "../app/components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const Dashboard = lazy(() => import('../app/components/Dashboard/Dashboard.jsx'));
const DashboardPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default DashboardPage;