'use client'

import {SessionProvider} from "next-auth/react"
import React, {useLayoutEffect} from "react";

export default function ClientProvider({
                                     children,
                                     session
                                 }: {
    children: React.ReactNode
    session: any
}): React.ReactNode {

    useLayoutEffect(() => {
        if (session) {
            sessionStorage.setItem("access_token", session.accessToken);
        }
    }, [session]);

    return <SessionProvider session={session}>
        {children}
    </SessionProvider>
}