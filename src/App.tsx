import React from 'react';
import packageJson from '../package.json';
import { useAtom } from 'jotai';

import {
  Switch,
  Select,
  SelectItem,
  Image,
  Input,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Link,
  CardHeader,
  Button,
  Progress,
  RadioGroup,
  Radio,
  Checkbox,
} from '@nextui-org/react';

import { SignOutButton } from '@clerk/clerk-react';
import { SystemRestart } from 'iconoir-react';

import { StatsViewSutra } from './components/StatsViewSutra';
import { StatsViewOther } from './components/StatsViewOther';
import { IPv4, Location } from './components/GeoInfo';
import { OutputViewSutra } from './components/OutputViewSutra';
import { OutputViewOther } from './components/OutputViewOther';
import Pricing from './components/Pricing';

// import Ping from "./components/Ping";
// const darkMode = useDarkMode(true);

import { SearchLocation, SEARCH_LOCATIONS } from './service/SearchLocations';
import { SutraModel, SUTRA_MODELS, OTHER_MODELS } from './service/SutraModels';
import {
  agentInfoAtom,
  userInputAtom,
  serviceURLAtom,
  searchLocationAtom,
  sutraModelAtom,
  sutraTemperatureAtom,
  sutraMaxTokensAtom,
  sutraLoadingAtom,
  otherModelAtom,
  otherTemperatureAtom,
  otherMaxTokensAtom,
  otherLoadingAtom,
  syncAtom,
  playgroundQuestionsAtom,
} from './state/atoms';
import { K } from './utils/K';

const QUESTIONS_URL = 'https://raw.githubusercontent.com/TwoResearch/playground-questions/main/questions.json';

const App = () => {
  const [userInput, setUserInput] = useAtom(userInputAtom);

  const [, setServiceURL] = useAtom(serviceURLAtom);
  const [searchLocation, setSearchLocation] = useAtom(searchLocationAtom);
  const [sutraModel, setSutraModel] = useAtom(sutraModelAtom);
  const [sutraTemperature, setSutraTemperature] = useAtom(sutraTemperatureAtom);
  const [sutraMaxTokens, setSutraMaxTokens] = useAtom(sutraMaxTokensAtom);
  const [sutraLoading] = useAtom(sutraLoadingAtom);

  const [otherModel, setOtherModel] = useAtom(otherModelAtom);
  const [otherTemperature, setOtherTemperature] = useAtom(otherTemperatureAtom);
  const [otherMaxTokens, setOtherMaxTokens] = useAtom(otherMaxTokensAtom);
  const [otherLoading] = useAtom(otherLoadingAtom);

  const [sync, setSync] = useAtom(syncAtom);

  const [text, setText] = React.useState('');
  const [error] = React.useState<string | undefined>(undefined);
  const [compareDUO, setCompareDUO] = React.useState(false);
  const [questions, setQuestions] = useAtom(playgroundQuestionsAtom);

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
    getQuestionFromOnline().then((data: { ultra: string[]; online: string[] }) => {
      if (sutraModel.displayName === 'SUTRA-ONLINE') {
        setQuestions(data.online);
      } else {
        setQuestions(data.ultra);
      }
    });
  }, []);

  const changeSearchLocation = (newLocation: SearchLocation): void => {
    setSearchLocation(newLocation);
  };

  const changeSutra = (newModel: SutraModel): void => {
    sutraModel.temperature = sutraTemperature;
    sutraModel.maxTokens = sutraMaxTokens;
    setSutraTemperature(newModel.temperature);
    setSutraMaxTokens(newModel.maxTokens);
    setSutraModel(newModel);
  };

  const changeOther = (newModel: SutraModel): void => {
    otherModel.temperature = otherTemperature;
    otherModel.maxTokens = otherMaxTokens;
    setOtherTemperature(newModel.temperature);
    setOtherMaxTokens(newModel.maxTokens);
    setOtherModel(newModel);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNewText = (ev: any): void => {
    setText(ev.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const issueNewText = (ev: any) => {
    if (ev && ev.code !== 'Enter' && ev.code !== 'NumpadEnter' && ev.keyCode !== 13) return;
    if (text.length === 0) return;
    console.log('setting userInput', text);
    setUserInput(text);
    setText('');
  };

  return (
    <React.Fragment>
      {/* <main className="dark"> */}
      <div className="flex w-full flex-row bg-white">
        {/* MAIN PANEL */}
        {/* <div className="flex flex-col"> */}
        <BG />
        {/* MENU  */}
        <div className="sticky top-0 flex h-screen min-w-64 flex-col gap-4 p-4">
          {/* SELECTS */}
          <>
            <div className="flex flex-col items-start gap-0 font-mono text-sm">
              <Image className="h-8" src="sutra.svg" />
              <div className="pl-1 text-xs font-bold">PLAYGROUND {packageJson.version}</div>
            </div>

            <Divider />
            {/* Sutra model selection */}
            <Select
              aria-label="Select Sutra Model"
              placeholder="Select Sutra Model"
              labelPlacement="inside"
              label="Select Sutra Model"
              selectedKeys={[sutraModel.displayName]}
              renderValue={() => {
                return (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="font-semibold">{sutraModel.displayName}</span>
                    </div>
                  </div>
                );
              }}
            >
              {SUTRA_MODELS.map((m) => (
                <SelectItem key={m.displayName} textValue={m.displayName} onClick={() => changeSutra(m)}>
                  <div className="flex flex-col">
                    <span className="">{m.displayName}</span>
                  </div>
                </SelectItem>
              ))}
            </Select>

            {/* SWITCHES */}
            <>
              <Switch isSelected={compareDUO} size="sm" onChange={() => setCompareDUO(!compareDUO)}>
                Compare Mode
              </Switch>
            </>

            {/* Sutra model selection  */}
            {compareDUO && (
              <Select
                aria-label="Select Other Model"
                placeholder="Select Other Model"
                labelPlacement="inside"
                label="Select Other Model"
                selectedKeys={[otherModel.displayName]}
                renderValue={() => {
                  return (
                    <div className="flex flex-row">
                      <span className="font-semibold">{otherModel.displayName}</span>
                    </div>
                  );
                }}
              >
                {OTHER_MODELS.map((m) => (
                  <SelectItem key={m.displayName} textValue={m.displayName} onClick={() => changeOther(m)}>
                    <div className="flex flex-col">
                      <span className="">{m.displayName}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
          </>

          <Divider />
          <div className="absolute bottom-0 left-0 flex w-full flex-col items-start gap-0 p-4 font-mono text-sm">
            {/* <Image className="h-8" src="sutra.svg" />
            <div className="font-bold">PLAYGROUND {packageJson.version}</div> */}
            <SignOutButton>
              <Link size="sm" className="hover:cursor-pointer">
                SIGN OUT
              </Link>
            </SignOutButton>
            <Divider className="my-2" />
            <div>
              {agentInfoAtom.os.name.toUpperCase()} | {agentInfoAtom.browser.name.toUpperCase()}
            </div>
            <div>
              <Location />
            </div>
            <div>
              <IPv4 />
            </div>
            <Divider className="my-2" />
            <RadioGroup label="SUTRA SERVER" orientation="horizontal" size="sm" defaultValue="US">
              <Radio value="US" onClick={() => setServiceURL(K.SUTRA_SERVICE_US)}>
                US
              </Radio>
              <Radio value="IN" onClick={() => setServiceURL(K.SUTRA_SERVICE_IN)}>
                IN
              </Radio>
              <Radio value="KR" onClick={() => setServiceURL(K.SUTRA_SERVICE_KR)}>
                KR
              </Radio>
            </RadioGroup>
            {sutraModel.modelId == 'sutra-online' && (
              <Select
                variant="underlined"
                aria-label="User Location"
                placeholder="User Location"
                labelPlacement="inside"
                label="USER LOCATION"
                selectedKeys={[searchLocation.displayName]}
                renderValue={() => {
                  return (
                    <div className="flex flex-col">
                      <span className="text-small">{searchLocation.displayName}</span>
                    </div>
                  );
                }}
              >
                {SEARCH_LOCATIONS.map((loc) => (
                  <SelectItem
                    key={loc.displayName}
                    textValue={loc.displayName}
                    onClick={() => changeSearchLocation(loc)}
                  >
                    <div className="flex flex-col">
                      <span>{loc.displayName}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
            <Divider className="my-2" />
            <Link isExternal showAnchorIcon size="sm" href="https://docs.two.ai">
              SUTRA API
            </Link>
            <Pricing />
            <div>© 2024 TWO.</div>
          </div>
        </div>
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
                  <p className="py-5 text-2xl font-semibold">{userInput}</p>
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
                  setText('');
                }}
                onChange={handleNewText}
                onKeyUp={issueNewText}
                value={text}
                autoFocus={true}
                startContent={
                  <Button
                    variant="light"
                    isIconOnly
                    onClick={() => {
                      const question = questions[Math.floor(Math.random() * questions.length)];
                      setText(question);
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
                    <p className="py-5 text-2xl font-semibold">{userInput}</p>
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
                    setText('');
                  }}
                  onChange={() => {
                    if (sync) {
                      handleNewText;
                    }
                  }}
                  onKeyUp={issueNewText}
                  value={text}
                  autoFocus={true}
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
