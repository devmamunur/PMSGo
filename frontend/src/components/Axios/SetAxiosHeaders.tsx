'use client';
import { useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  accessToken: string;
}

const SetAxiosHeaders = () => {
  const { data: session } = useSession();
  useEffect(() => {
    console.log('Session data : ', session);
    if (session) {
      // @ts-ignore
      axios.defaults.headers.common = {
        Authorization: `Bearer ${(session.user as SessionUser).accessToken}`,
      };
    }
  }, [session]);
  return null;
};

export default SetAxiosHeaders;
