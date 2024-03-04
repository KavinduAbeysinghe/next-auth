"use client";

import IsAuthClient from "@/app/util/IsAuthClient";
import {axiosInstance} from "@/app/store/store";
import {useEffect, useState} from "react";

const Module1 = () => {

    const [state, setState] = useState("");

    const fetchProtectedData = async () => {
        try {
            const res = await axiosInstance.get("/protected");
            if (res?.data?.status === 200) {
                setState(res?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProtectedData();
    }, []);

    return <>
        <h1>Module 1</h1>
        <h2>{state}</h2>
    </>;
}

export default IsAuthClient(Module1, ["it"]);