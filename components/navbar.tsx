
import { MainNav } from "./main-nav";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import Logo from "@/components/ui/logo";
import { SignInButton } from "@/components/ui/sign-in-button";

export const Navbar = async () => {
    

    return ( 
        <div className="border-b fixed w-full bg-white">
            <div className="flex h-16 items-center px-4 mx-auto max-w-[1200px]">
                <Logo />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <SignInButton />
                </div>
            </div>
        </div>
     );
}