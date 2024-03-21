import { SignIn } from '@clerk/clerk-react';
import { Image } from '@nextui-org/react';

export const SigninView = () => {
  return (
    <>
      <div className="flex h-dvh items-center justify-center ">
        <div className="flex h-full w-full basis-3/5 items-center justify-center gap-5 bg-gray-400">
          <Image src="/public/sutra512X512.png" width={150} height={150} />
          <div className="overflow-hidden text-4xl">SUTRA PLAYGROUND</div>
        </div>
        <div className="flex h-full basis-2/5 items-center justify-center">
          <SignIn />
        </div>
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
