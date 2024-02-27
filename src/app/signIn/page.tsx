import {getProviders} from "next-auth/react";
import SignInButton from "@/app/signIn/SignInButton";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

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
            {Object.values(providers).map((provider: any) => <>
                <SignInButton key={provider.id} provider={provider}/>
            </>)}
        </>
    );
}

export default SignIn;