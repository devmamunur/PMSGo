'use client';
import React, { ReactNode, useEffect } from 'react';
import axiosInstance from '@/services/axios';
import { useSession } from 'next-auth/react';

interface Props {
  children: ReactNode;
}
function AxiosProvider({ children }: Props) {
  const { data: session } = useSession();
  useEffect(() => {
    if (
      session &&
      session.user &&
      (session.user as { accessToken: string }).accessToken
    ) {
      axiosInstance.interceptors.request.use(async config => {
        config.headers['Authorization'] = `Bearer ${
          (session.user as { accessToken: string }).accessToken
        }`;
        return config;
      });
    }
  }, [session]);
  return <>{children}</>;
}

export default AxiosProvider;
