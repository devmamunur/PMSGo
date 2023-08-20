'use client';
import React, { lazy, Suspense } from 'react';
import MasterLayout from '@/components/MasterLayout/MasterLayout';
import LazyLoader from '@/components/MasterLayout/LazyLoader';

const Project = lazy(() => import('@/components/Project/Project'));
const ProjectPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Project />
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default ProjectPage;
