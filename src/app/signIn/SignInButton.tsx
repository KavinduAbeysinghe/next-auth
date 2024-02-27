"use client";

import {signIn} from "next-auth/react";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";

const SignInButton = ({provider}: any) => {

    const router = useRouter();

    const handleSignIn = async () => {
        const result = await signIn(provider.id);
        if (result && !result.error) {
            router.replace("/");
        }
    }

    return <Button variant={"contained"} onClick={handleSignIn}>Continue
        with {provider.name}</Button>
}

export default SignInButton;