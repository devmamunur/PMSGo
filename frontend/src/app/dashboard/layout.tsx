"use client"
import React from "react";
import { useSession} from "next-auth/react"
import {useRouter} from "next/navigation";
import {RootLayoutProps} from "@/interfaces/layout-props.interface";
export default function Layout ({ children } : RootLayoutProps) {
    const router = useRouter();
    const { status  } = useSession();
    console.log('Status : '+ status);
    if(status === "loading"){
        return ("loading...");
    }else if(status === "authenticated"){
        return (
            <>
                {children}
            </>
        )
    }else if(status === "unauthenticated") {
        router.push('login')
    }
}
