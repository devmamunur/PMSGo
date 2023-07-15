'use client';
import React, { lazy, Suspense } from 'react';
import MasterLayout from '@/components/MasterLayout/MasterLayout';
import LazyLoader from '@/components/MasterLayout/LazyLoader';
const User = lazy(() => import('@/components/User/User'));
const Page: React.FC = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <User />
        </Suspense>
      </MasterLayout>
    </>
  );
};

export default Page;
