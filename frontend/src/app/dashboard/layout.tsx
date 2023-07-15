'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RootLayoutProps } from '@/interfaces/layout-props.interface';
export default function Layout({ children }: RootLayoutProps) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('signin');
    },
  });

  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }

  return <>{children}</>;
}
