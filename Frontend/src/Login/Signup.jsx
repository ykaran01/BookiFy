import { SignedIn, SignUp, useUser } from "@clerk/clerk-react";

import React, { useEffect } from 'react'
const Signup = ({sent}) => {
    const { isSignedIn, user } = useUser();
    

    return (
        <div className=" max-w-screen p-10   justify-center items-center bg-zinc-900 flex ">
            <SignUp signInUrl='/signin' />
        </div>
    )
}
export default Signup