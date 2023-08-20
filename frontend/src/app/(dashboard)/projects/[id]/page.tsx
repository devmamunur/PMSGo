
import React, {lazy, Suspense} from 'react';
import MasterLayout from '@/components/MasterLayout/MasterLayout';
import LazyLoader from '@/components/MasterLayout/LazyLoader';
const ProjectDetails = lazy(() => import('@/components/Project/ProjectDetails'));
const ProjectDetailsPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <ProjectDetails/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default ProjectDetailsPage;