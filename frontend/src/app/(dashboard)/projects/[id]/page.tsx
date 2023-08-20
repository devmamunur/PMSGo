import React, {Suspense} from 'react';
import MasterLayout from '@/components/MasterLayout/MasterLayout';
import LazyLoader from '@/components/MasterLayout/LazyLoader';

const ProjectDetailsPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    Project detail
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default ProjectDetailsPage;