import {getProviders} from "next-auth/react";
import SignInButton from "@/app/signIn/SignInButton";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import React from "react";

const SignIn = async () => {

    const session = await getServerSession();

    if (session?.user) {
        redirect("/");
    }

    const res = await getProviders();
    const providers = res ?? {};

    return (
        <>
            <h1>Sign In</h1>
            {Object.values(providers).map((provider: any, index) =>
                <React.Fragment key={provider.id}>
                    <SignInButton provider={provider}/>
                </React.Fragment>
            )}
        </>
    );
}

export default SignIn;