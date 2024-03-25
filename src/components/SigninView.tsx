import { SignIn } from '@clerk/clerk-react';
import { Image, Link, cn } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { isMobileAtom } from '../state/atoms';
import packageJson from '../../package.json';
import Spline from '@splinetool/react-spline';

export const SigninView = () => {
  const [isMobile] = useAtom(isMobileAtom);

  console.log(isMobile);

  return (
    <>
      <div className={cn('flex h-dvh items-center justify-center', isMobile && 'bg-blue-50')}>
        {!isMobile && (
          <div className="flex h-full w-full basis-3/5 flex-col flex-wrap gap-2 bg-white">
            <Image className="m-5 h-7" radius="none" src="sutra.svg" />
            <div className="h-[80%] w-full">
              <iframe
                src="https://my.spline.design/CZpqVdZAaJ5IkZdATtMFAfnc/"
                // frameborder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
            <div className="absolute bottom-4 left-4 flex w-96 flex-col gap-3 text-sm text-gray-500">
              <p className="">
                SUTRA is a series of ultrafast, multilingual, online Generative AI models. This playground demonstrates
                and compares SUTRA with other SOTA LLMs like GPT, Mistral, Perplexity and more.
              </p>
              <p>PLAYGROUND {packageJson.version}</p>
              <Link isExternal showAnchorIcon size="sm" href="https://two.ai">
                © 2024 TWO.
              </Link>
            </div>
          </div>
        )}
        <div className="flex h-full basis-2/5 flex-col items-center justify-center gap-5 bg-blue-50">
          {isMobile && (
            <div className="absolute bottom-4 left-4 flex w-96 flex-col gap-3 text-sm text-gray-500">
              <p>PLAYGROUND {packageJson.version}</p>
              <Link isExternal showAnchorIcon size="sm" href="https://two.ai">
                © 2024 TWO.
              </Link>
            </div>
          )}
          <div className="relative">
            <SignIn />
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
