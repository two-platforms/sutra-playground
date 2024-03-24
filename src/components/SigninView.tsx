import { SignIn } from '@clerk/clerk-react';
import { Image, cn } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { isMobileAtom } from '../state/atoms';
import packageJson from '../../package.json';
import Spline from '@splinetool/react-spline';

export const SigninView = () => {
  const [isMobile] = useAtom(isMobileAtom);

  console.log(isMobile);

  return (
    <>
      <div className={cn('flex h-dvh items-center justify-center', isMobile && 'bg-blue-500')}>
        {!isMobile && (
          <div className="flex h-full w-full basis-3/5 flex-col flex-wrap gap-2 bg-white">
            <Image className="m-5 h-8" src="sutra.svg" />
            <div className="h-[80%] w-full">
              <Spline scene="https://prod.spline.design/XlgWaQLdgYYWTyEg/scene.splinecode" />
            </div>
            <div className="flex w-full flex-1 items-end justify-between overflow-hidden p-0">
              <div className=" pb-3 text-gray-500">PLAYGROUND {packageJson.version}</div>
              <div className="pb-3 text-sm text-gray-500">by TWO.AI</div>
            </div>

            {/* <BG/> */}
            {/* <Image className="h-11" src="sutra.svg" />
            <div className="absolute bottom-2 right-[41%] overflow-hidden text-sm text-black">
              PLAYGROUND {packageJson.version}
            </div>
            <div className="absolute bottom-2 left-4 overflow-hidden text-sm text-white">by TWO.AI</div> */}
          </div>
        )}
        <div className="flex h-full basis-2/5 flex-col items-center justify-center gap-5 bg-blue-500">
          {isMobile && (
            <div className="flex flex-wrap items-end gap-3">
              <Image className="h-8" src="sutra.svg" />
              <div className="font-mono text-2xl">PLAYGROUND</div>
            </div>
          )}
          <div>
            <SignIn />
            {/* <div className="flex-1 bg-red-300">hello</div> */}
          </div>
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

// const BG = () => {
//   return (
//     <>
//       <div className="absolute inset-0 flex items-center justify-center overflow-hidden blur-[10vw] saturate-150">
//         <div className="absolute h-1/2 w-full animate-orbit2">
//           <div className="absolute left-[25%] top-[20%] w-[40%] rounded-full bg-blue-200 pb-[40%]"></div>
//         </div>
//         <div className="absolute h-full w-full animate-orbit3">
//           <div className="absolute left-[30%] top-[50%] w-[30%] rounded-full bg-gray-400 pb-[30%]"></div>
//         </div>
//         <div className="absolute h-full w-1/2 animate-orbit4">
//           <div className="absolute left-[25%] top-[25%] w-[30%] rounded-full bg-white pb-[30%]"></div>
//         </div>
//       </div>
//     </>
//   );
// };
