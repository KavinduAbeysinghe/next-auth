"use client";

import React, {useLayoutEffect} from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function IsAuthClient(Component: any, allowedRoles?: string[]) {
    return function WithAuth(props: any) {
        const {data: session} = useSession();

        useLayoutEffect(() => {
            console.log(session);
            if (!session?.user) {
                redirect("/signIn");
            }
            if (allowedRoles?.length) {
                const allowed = allowedRoles?.some(role => session?.roles?.includes(role));
                if (!allowed) {
                    redirect("/signIn");
                }
            }
        }, []);

        if (!session?.user) {
            return null;
        }

        if (allowedRoles?.length) {
            const allowed = allowedRoles?.some(role => session?.roles?.includes(role));
            if (!allowed) {
                return null;
            }
        }

        return <Component {...props}/>;
    }
}