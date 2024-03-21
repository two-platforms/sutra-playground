import { SignIn } from '@clerk/clerk-react';
import { Image } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { isMobileAtom } from '../state/atoms';
import packageJson from '../../package.json';

export const SigninView = () => {
  const [isMobile] = useAtom(isMobileAtom);

  console.log(isMobile);

  return (
    <>
      <div className="flex h-dvh items-center justify-center ">
        {!isMobile && (
          <div className="flex h-full w-full basis-3/5 flex-col flex-wrap items-center justify-center gap-5 bg-gray-50">
            <div>
              <Image className="mb-3 h-8" src="sutra.svg" />
              <div className="overflow-hidden font-mono text-lg text-black/60">PLAYGROUND {packageJson.version}</div>
              {/* <div className="overflow-hidden font-mono text-lg text-black/60">by TWO.AI {packageJson.version}</div> */}
            </div>
          </div>
        )}
        <div className="flex h-full basis-2/5 flex-col items-center justify-center gap-5">
          {isMobile && (
            <div className="flex flex-wrap items-end gap-3">
              <Image className="h-8" src="sutra.svg" />
              <div className="font-mono text-2xl">PLAYGROUND</div>
            </div>
          )}
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
