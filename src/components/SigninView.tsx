import React from 'react';

import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@nextui-org/react';

export const SigninView = () => {
  return (
    <>
      <div className="flex h-dvh items-center justify-center ">
        <SignIn />
      </div>

      {/* <SignedOut>
        <SignInButton>
          <Button>ss</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </>
  );
};
