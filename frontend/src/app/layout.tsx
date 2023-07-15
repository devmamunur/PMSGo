'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/css/global.css';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import { RootLayoutProps } from '@/interfaces/layout-props.interface';
import AxiosProvider from '@/services/AxiosProvider';

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <SessionProvider>
          <Provider store={store}>
            <AxiosProvider>{children}</AxiosProvider>
            <ToastContainer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
