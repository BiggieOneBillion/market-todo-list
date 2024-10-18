import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const signIn = () => setIsSignIn(true);
  const signUp = () => setIsSignIn(false);
  return (
    <section className="flex-1 pt-10 md:min-h-screen w-screeny bg-[#EDF4F2] flex justify-center items-center pb-5">
      {isSignIn ? (
        <SignIn handleSignUp={signUp} />
      ) : (
        <SignUp handleSignIn={signIn} />
      )}
    </section>
  );
};

export default Auth;
