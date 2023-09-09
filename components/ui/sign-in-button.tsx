"use client";

import {signIn, signOut, useSession} from 'next-auth/react';

export const SignInButton = () => {
    const {data: session} = useSession();

    if (session && session.user) {
      return(
        <div>
          <p>{session.user.name}
          <button onClick={() => signOut()} className="ml-3">
            Sign Out
          </button>
          </p>
        </div>
      )
    }
  return (
    <button onClick={() => signIn()}>
      Sign In
    </button>
  )
}
