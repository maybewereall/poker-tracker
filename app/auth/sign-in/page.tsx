"use client";

import LoginForm from "@/components/forms/log-in";
import { useLoading } from "@/hooks/use-loading";
import { signIn } from "next-auth/react";
import Link from "next/link";


const LoginPage = () => {
    const {loading, setLoading} = useLoading();

    const handleSubmit = async (data: { email: string; password: string; }) => {
        const result = await signIn("credentials", {
            username: data.email,
            password: data.password,
            redirect: true,
            callbackUrl: "/"
        })
        console.log(data);
    }
    return ( 
        <div className="flex items-center justify-center h-full">
            <LoginForm loading={loading} onSubmit={handleSubmit}/>
        </div>
    )
}

export default LoginPage