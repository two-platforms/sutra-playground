import { SignIn } from '@clerk/clerk-react';
import { Image, Link, cn } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { isMobileAtom } from '../state/atoms';
import packageJson from '../../package.json';

export const SigninView = () => {
  const [isMobile] = useAtom(isMobileAtom);

  return (
    <>
      <div className={cn('flex h-dvh w-full items-center justify-center')}>
        <div className={cn('flex h-full w-full flex-col flex-wrap gap-2', !isMobile && 'basis-3/5')}>
          <Image className="fixed left-0 top-0 m-5 h-7" radius="none" src="sutra.svg" />
          <div className="h-[80%] w-full">
            <iframe src="https://my.spline.design/CZpqVdZAaJ5IkZdATtMFAfnc/" width="100%" height="100%"></iframe>
          </div>
          <div className="absolute bottom-4 left-4 flex w-96 flex-col gap-3 text-sm text-gray-500">
            {isMobile && <p>❗️Only available on desktop</p>}
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

        {!isMobile && (
          <div className="flex h-full basis-2/5 flex-col items-center justify-center gap-5 bg-blue-50">
            <div className="absolute bottom-4 left-4 flex w-96 flex-col gap-3 text-sm text-gray-500">
              <p>PLAYGROUND {packageJson.version}</p>
              <Link isExternal showAnchorIcon size="sm" href="https://two.ai">
                © 2024 TWO.
              </Link>
            </div>
            <div className="relative">
              <SignIn />
              <div className="flex w-full flex-col items-center gap-3 pt-16 text-sm text-gray-500">
                <p>Please use business email address for Sign In.</p>
              </div>
            </div>
          </div>
        )}
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
