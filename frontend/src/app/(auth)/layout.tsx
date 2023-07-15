'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RootLayoutProps } from '@/interfaces/layout-props.interface';

export default function Layout({ children }: RootLayoutProps) {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') {
    return 'loading...';
  } else if (status === 'authenticated') {
    router.push('/dashboard');
  } else if (status === 'unauthenticated') {
    return <>{children}</>;
  }
}
