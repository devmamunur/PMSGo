'use client';
import React, { lazy, Suspense } from 'react';
import LazyLoader from '@/components/MasterLayout/LazyLoader';
const SignUp = lazy(() => import('@/components/SignUp/SignUp'));
const Register: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <SignUp />
      </Suspense>
    </>
  );
};
export default Register;
