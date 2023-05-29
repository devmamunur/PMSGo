"use client"
import React from "react";
import {ToastContainer} from "react-toastify";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "react-toastify/dist/ReactToastify.css";
import '@/assets/css/global.css'
import {SessionProvider} from "next-auth/react";
import {RootLayoutPropsWithSession} from "@/interfaces/layout-props.interface";
import {Provider} from "react-redux";
import store from "@/redux/store/store";
import SetAxiosHeaders from "@/components/Axios/SetAxiosHeaders";

export default function RootLayout({children, session}: RootLayoutPropsWithSession) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            <SessionProvider session={session}>
                <SetAxiosHeaders/>
                {children}
            </SessionProvider>
            <ToastContainer/>
        </Provider>
        </body>
        </html>
    )
}
