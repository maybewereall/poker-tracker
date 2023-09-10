"use client";

import RegisterForm from "@/components/forms/register";
import { useLoading } from "@/hooks/use-loading";
import { signIn } from "next-auth/react";
import axios from "axios";

const SignUpPage = () => {
    const {loading, setLoading} = useLoading();

    const handleSubmit = async (data: { email: string; password: string; }) => {
        const result = await axios.post("/api/register", {
            email: data.email,
            password:  data.password
        });

        if(result.status === 200) {
            console.log({data: [result.data.email, result.data.password]})
            await signIn("credentials", {
                email: result.data.email,
                password: result.data.password,
                redirect: true,
                callbackUrl: "/",
              })
        }
    }
    return ( 
        <div className="flex items-center justify-center h-full">
            <RegisterForm loading={loading} onSubmit={handleSubmit}/>
        </div>
    )
}

export default SignUpPage