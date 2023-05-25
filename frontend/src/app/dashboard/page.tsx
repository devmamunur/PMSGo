"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
const DashboardPage = () => {
    const handelClick = ()=> {
        signOut({ callbackUrl: '/login' }).then(r => {
            alert('success');
        });
    }
    return (
        <>
            <h1>Dashboard</h1>
            <button  onClick={handelClick}>
                Sign out
            </button>
        </>
    );
};

export default DashboardPage;