import React, { Suspense } from 'react';
import MasterLayout from '@/components/MasterLayout/MasterLayout';
import LazyLoader from '@/components/MasterLayout/LazyLoader';
import ProjectDetails from '@/components/Project/Details/ProjectDetails';

const ProjectDetailsPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <ProjectDetails />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default ProjectDetailsPage;
