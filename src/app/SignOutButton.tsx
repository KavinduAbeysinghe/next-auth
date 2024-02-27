"use client";

import {Button} from "@mui/material";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

const SignOutButton = ({provider}: any) => {

    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({redirect: false, callbackUrl: "/signIn"});
        router.replace("/signIn");
    }

    return <Button variant={"contained"} onClick={handleSignOut}>Sign Out</Button>
}

export default SignOutButton;