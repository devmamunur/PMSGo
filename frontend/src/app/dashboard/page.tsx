"use client"
import React, {lazy, Suspense} from 'react';
import {signOut} from "next-auth/react";
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";

const Dashboard = lazy(() => import('@/components/Dashboard/Dashboard'));
const DashboardPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default DashboardPage;