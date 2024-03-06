"use client"

import SignOutButton from "@/app/SignOutButton";
import {decodeJwt} from "jose";
import {redirect, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import IsAuthClient from "@/app/util/IsAuthClient";
import CustomButton from "@/app/components/CustomButton";
import {useEffect, useLayoutEffect} from "react";
import {axiosInstance} from "@/app/store/store";

const Home = () => {

    const {data: session, update} = useSession();

    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
    }

    return <>
        {
            session?.user ? <>
                    <h1>{session.user.email} has logged in</h1>
                    <SignOutButton/>
                    <CustomButton onClick={() => handleNavigate("/module1")}>Module 1</CustomButton>
                    <CustomButton onClick={() => handleNavigate("/module2")}>Module 2</CustomButton>
                </>
                : <h1>Please Login</h1>
        }
    </>
}

export default IsAuthClient(Home);