import React, { useEffect, useRef } from 'react';
import { SignIn, useUser, useAuth } from '@clerk/clerk-react';


const Signin = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    

   

    useEffect(() => {
        const sendUser = async () => {
            if (!isLoaded || !isSignedIn || !user) return;
            if (sent.current) return;

            sent.current = true;

            try {
                const token = await getToken();

                await signInservice();

            } catch (err) {
                console.log(err);
            }
        };

        sendUser();

    }, [isLoaded, isSignedIn, user]);

    if (!isLoaded) {
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-zinc-900 text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-zinc-900">
            <SignIn signUpUrl="/signup" />
        </div>
    );
};

export default Signin;