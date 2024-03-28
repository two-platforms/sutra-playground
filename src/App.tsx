import React from 'react';
import { useAtom } from 'jotai';

import {
  Image,
  Input,
  Divider,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Progress,
  Checkbox,
} from '@nextui-org/react';

import { SystemRestart } from 'iconoir-react';

import { StatsViewSutra } from './components/StatsViewSutra';
import { StatsViewOther } from './components/StatsViewOther';
import { OutputViewSutra } from './components/OutputViewSutra';
import { OutputViewOther } from './components/OutputViewOther';

// const darkMode = useDarkMode(true);

import { initStats } from './service/SutraModels';
import {
  sutraUserInputAtom,
  otherUserInputAtom,
  sutraModelAtom,
  sutraLoadingAtom,
  otherModelAtom,
  otherLoadingAtom,
  syncAtom,
  playgroundQuestionsAtom,
  otherStatsAtom,
  sutraStatsAtom,
  compareDUOAtom,
} from './state/atoms';
import { MenuLeftView } from './components/MenuLeftView';
import { useLocalStorage } from '@uidotdev/usehooks';
import WelcomeModal from './components/modal/WelcomeModal';

const QUESTIONS_URL = 'https://raw.githubusercontent.com/TwoResearch/playground-questions/main/questions.json';

const App = () => {
  const [sutraUserInput, setSutraUserInput] = useAtom(sutraUserInputAtom);
  const [otherUserInput, setOtherUserInput] = useAtom(otherUserInputAtom);

  const [sutraModel] = useAtom(sutraModelAtom);
  const [sutraLoading] = useAtom(sutraLoadingAtom);

  const [otherModel] = useAtom(otherModelAtom);
  const [otherLoading] = useAtom(otherLoadingAtom);

  const [sync, setSync] = useAtom(syncAtom);

  const [sutraText, setSutraText] = React.useState('');
  const [otherText, setOtherText] = React.useState('');

  const [error] = React.useState<string | undefined>(undefined);
  const [compareDUO] = useAtom(compareDUOAtom);
  const [questions, setQuestions] = useAtom(playgroundQuestionsAtom);

  const [isMouseEnter, setIsMouseEnter] = React.useState(false);

  const [, setSutrastats] = useAtom(sutraStatsAtom);
  const [, setOtherstats] = useAtom(otherStatsAtom);
  const sutraInputRef = React.useRef<HTMLInputElement>(null);

  const [welcomeShwon] = useLocalStorage('welcomeShown', false);

  //const errorRef = React.useRef<string | undefined>(undefined);

  // // two potential error sources, show both if both erred
  // const addError = (errorMessage: string): void => {
  //   if (errorRef.current) {
  //     errorRef.current = errorRef.current + " | " + errorMessage;
  //   } else {
  //     errorRef.current = errorMessage;
  //   }
  //   setError(errorRef.current);
  // };

  // const reset = (): void => {
  //   // override these (handy in case we're locked)
  //   setSutraInFlight(false);
  //   setOtherInFlight(false);
  // };

  const getQuestionFromOnline = async () => {
    const response = await fetch(QUESTIONS_URL);
    const data = await response.json();
    return data;
  };

  React.useEffect(() => {
    if (sync) {
      setOtherText(sutraText);
    }
  }, [sync, sutraText]);

  React.useEffect(() => {
    getQuestionFromOnline().then((data: { ultra: string[]; online: string[] }) => {
      if (sutraModel.displayName === 'SUTRA-ONLINE') {
        setQuestions(data.online);
      } else {
        setQuestions(data.ultra);
      }
    });
  }, [sutraModel]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNewText = (ev: any): void => {
    if (sync) {
      setSutraText(ev.target.value);
      setOtherText(ev.target.value);
    } else {
      setSutraText(ev.target.value);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issueNewText = (ev: any) => {
    if (ev && ev.code !== 'Enter' && ev.code !== 'NumpadEnter' && ev.keyCode !== 13) return;
    if (sutraText.length === 0 && otherText.length === 0) return;

    if (sutraText.length !== 0) {
      setSutrastats(initStats());
      sutraText.length !== 0 && setSutraUserInput(sutraText);
    }
    if (otherText.length !== 0) {
      setOtherstats(initStats());
      otherText.length !== 0 && setOtherUserInput(otherText);
    }

    setSutraText('');
    setOtherText('');
  };

  return (
    <React.Fragment>
      {welcomeShwon === false && <WelcomeModal />}

      {/* <main className="dark"> */}
      <div className="flex w-full flex-row bg-white">
        {/* MAIN PANEL */}
        {/* <div className="flex flex-col"> */}
        <BG />
        {/* MENU  */}
        <MenuLeftView />
        {/* 100vh */}
        <div className="z-10 flex h-screen max-h-screen w-full flex-col gap-3 p-4">
          {/* CHAT */}
          <div className="flex h-64 flex-1 flex-row justify-between gap-3">
            <div className="flex w-full flex-col gap-4">
              <Card className="w-full flex-1">
                <CardHeader className="flex gap-3">
                  <Image alt="sutra" height={40} radius="sm" src={sutraModel.iconUrl} width={40} />
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">{sutraModel.displayName}</p>
                    <p className="text-small text-default-500">{sutraModel.provider}</p>
                  </div>
                </CardHeader>
                <Divider />
                {sutraLoading && <Progress size="sm" isIndeterminate aria-label="Loading..." className="w-full" />}
                <CardBody>
                  <p
                    className=" cursor-pointer gap-1 py-5 text-2xl font-semibold"
                    onClick={() => setSutraText(sutraUserInput)}
                    onMouseEnter={() => {
                      setIsMouseEnter(true);
                    }}
                    onMouseLeave={() => {
                      setIsMouseEnter(false);
                    }}
                  >
                    {sutraUserInput}
                    {isMouseEnter && '↺'}
                  </p>
                  <OutputViewSutra />
                </CardBody>
                <Divider />
                <CardFooter className="h-16 min-h-16">
                  <StatsViewSutra />
                </CardFooter>
              </Card>
              <Input
                isClearable
                variant="faded"
                placeholder="Ask Anything..."
                fullWidth
                size="lg"
                defaultValue=""
                onClear={() => {
                  console.log('input cleared');
                  setSutraText('');
                }}
                ref={sutraInputRef}
                onChange={handleNewText}
                onKeyUp={issueNewText}
                value={sutraText}
                startContent={
                  <Button
                    variant="light"
                    isIconOnly
                    onClick={() => {
                      const question = questions[Math.floor(Math.random() * questions.length)];
                      setSutraText(question);
                      if (sutraInputRef.current) {
                        sutraInputRef.current.focus();
                      }
                    }}
                  >
                    <SystemRestart />
                  </Button>
                }
                classNames={{
                  input: [
                    'bg-transparent',
                    'text-black text-xl font-semibold',
                    'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                  ],
                  innerWrapper: ['flex'],
                  inputWrapper: ['shadow-xl', 'bg-white', 'border-2 border-blue-500 h-14'],
                }}
              />
            </div>

            {compareDUO && (
              <div className="flex w-full flex-col gap-4">
                <Card className="w-full flex-1">
                  <CardHeader className="flex gap-3">
                    <Image alt="nextui logo" height={40} radius="sm" src={otherModel.iconUrl} width={40} />
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">{otherModel.displayName}</p>
                      <p className="text-small text-default-500">{otherModel.provider}</p>
                    </div>
                  </CardHeader>
                  <Divider />
                  {otherLoading && <Progress size="sm" isIndeterminate aria-label="Loading..." className="w-full" />}
                  <CardBody>
                    <p
                      className="cursor-pointer py-5 text-2xl font-semibold"
                      onClick={() => setOtherText(otherUserInput)}
                      onMouseEnter={() => {
                        setIsMouseEnter(true);
                      }}
                      onMouseLeave={() => {
                        setIsMouseEnter(false);
                      }}
                    >
                      {otherUserInput}
                      {isMouseEnter && '↺'}
                    </p>
                    <OutputViewOther />
                  </CardBody>
                  <Divider />
                  <CardFooter className="h-16 min-h-16">
                    <StatsViewOther />
                  </CardFooter>
                </Card>
                <Input
                  isClearable
                  variant="faded"
                  placeholder="Ask Anything..."
                  fullWidth
                  size="lg"
                  defaultValue=""
                  onClear={() => {
                    console.log('input cleared');
                    setOtherText('');
                  }}
                  onChange={(ev) => {
                    if (sync) {
                      handleNewText;
                    } else {
                      setOtherText(ev.target.value);
                    }
                  }}
                  // onKeyUp={issueNewText}
                  value={otherText}
                  onKeyUp={issueNewText}
                  startContent={<Checkbox isSelected={sync} onValueChange={() => setSync(!sync)}></Checkbox>}
                  classNames={{
                    input: [
                      'bg-transparent',
                      'text-black text-xl font-semibold',
                      'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                    innerWrapper: ['flex'],
                    inputWrapper: ['shadow-xl', 'bg-white', 'border-2 border-blue-500 h-14'],
                  }}
                />
              </div>
            )}
          </div>

          {error !== undefined && (
            <Card className="absolute top-0 z-10 max-w-sm self-center rounded-t-none">
              <CardBody>
                <div>{error}</div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
      {/* </main> */}
    </React.Fragment>
  );
};

export default App;

const BG = () => {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden blur-[10vw] saturate-150">
        <div className="absolute h-1/2 w-full animate-orbit2">
          <div className="absolute left-[25%] top-[20%] w-[40%] rounded-full bg-blue-200 pb-[40%]"></div>
        </div>
        <div className="absolute h-full w-full animate-orbit3">
          <div className="absolute left-[30%] top-[50%] w-[30%] rounded-full bg-gray-400 pb-[30%]"></div>
        </div>
        <div className="absolute h-full w-1/2 animate-orbit4">
          <div className="absolute left-[25%] top-[25%] w-[30%] rounded-full bg-white pb-[30%]"></div>
        </div>
      </div>
    </>
  );
};
