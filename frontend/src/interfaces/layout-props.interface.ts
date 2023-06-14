import React from "react";
import {Session} from "next-auth";
export interface RootLayoutProps {
    children: React.ReactNode;
}

export interface RootLayoutPropsWithSession {
    children: React.ReactNode;
    session?: any;
}