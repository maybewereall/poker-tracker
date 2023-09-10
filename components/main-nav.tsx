"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export function MainNav({
    className,
    ...props
}:  HTMLAttributes<HTMLElement> ) {
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoggedIn, setLoggedIn] = useState(false);
    // if( !session?.user ) {
    //     router.push('/auth/sign-in');
    // }
    const routes = [
        {
            href: `/players`,
            label: "Players",
            active: pathname === `/players`
        },
        {
            href: `/game`,
            label: "Games",
            active: pathname === `/game`
        }
    ];

    useEffect(() => {
        if(session?.user) {
            setLoggedIn(true);
        }
    }, [session])

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {
                routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary pointer-events-none opacity-10",
                            route.active ? "text-black dark:text-white underline" : "text-muted-foreground",
                            isLoggedIn && "pointer-events-auto opacity-100"
                        )}
                        
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    )
}