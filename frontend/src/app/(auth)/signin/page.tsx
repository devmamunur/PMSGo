'use client';
import React, { lazy, Suspense } from 'react';
import LazyLoader from '@/components/MasterLayout/LazyLoader';
const SignIn = lazy(() => import('@/components/SignIn/SignIn'));
const Login: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <SignIn />
      </Suspense>
    </>
  );
};

export default Login;
