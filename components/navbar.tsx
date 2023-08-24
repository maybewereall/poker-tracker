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
        <div className="border-b fixed w-full">
            <div className="flex h-16 items-center px-4 mx-auto max-w-7xl">
                <Logo />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton />
                </div>
            </div>
        </div>
     );
}