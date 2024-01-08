import React, { Suspense } from 'react';
import MasterLayout from '@/components/MasterLayout/MasterLayout';
import LazyLoader from '@/components/MasterLayout/LazyLoader';
import TaskBoard from '@/components/Project/Details/TaskBoard/TaskBoard';

const TaskBoardPage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <TaskBoard />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default TaskBoardPage;
