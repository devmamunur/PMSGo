import React, { lazy, Suspense } from 'react';
import LazyLoader from '@/components/MasterLayout/LazyLoader';

const SendOTP = lazy(() => import('@/components/PasswordRecover/SendOTP'));
const SendOtpPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <SendOTP />
      </Suspense>
    </>
  );
};

export default SendOtpPage;
