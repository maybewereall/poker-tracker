// import * as React from 'react';

// interface INavbarProps {
// }

// const Navbar: React.FC<INavbarProps> = (props) => {
//   return (
//     <div></div>
//   );
// };

// export default Navbar;

import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "./main-nav";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import Logo from "@/components/ui/logo";

export const Navbar = async () => {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    return ( 
        <div className="border-b fixed w-full bg-white z-[10]">
            <div className="flex h-10 md:h-16 items-center px-4 mx-auto max-w-[1200px]">
                <Logo />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton />
                </div>
            </div>
        </div>
     );
}