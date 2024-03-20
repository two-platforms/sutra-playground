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
} from '@nextui-org/react';

import './styles/chatui.css';
// import { OutputView } from './components/OutputView';
import { StatsView } from './components/StatsView';
import { IPv4, Location } from './components/GeoInfo';
// import Ping from "./components/Ping";

// const darkMode = useDarkMode(true);

import { SutraModel, SUTRA_MODELS, OTHER_MODELS } from './service/SutraModels';
import {
  agentInfoAtom,
  userInputAtom,
  sutraModelAtom,
  sutraTemperatureAtom,
  sutraMaxTokensAtom,
  sutraStatsAtom,
  otherModelAtom,
  otherTemperatureAtom,
  otherMaxTokensAtom,
  otherStatsAtom,
} from './state/atoms';
import { OutputViewSutra } from './components/OutputViewSutra';
import { OutputViewOther } from './components/OutputViewOther';

const App = () => {
  const [userInput, setUserInput] = useAtom(userInputAtom);
  const [sutraModel, setSutraModel] = useAtom(sutraModelAtom);
  const [sutraTemperature, setSutraTemperature] = useAtom(sutraTemperatureAtom);
  const [sutraMaxTokens, setSutraMaxTokens] = useAtom(sutraMaxTokensAtom);
  const [otherModel, setOtherModel] = useAtom(otherModelAtom);
  const [otherTemperature, setOtherTemperature] = useAtom(otherTemperatureAtom);
  const [otherMaxTokens, setOtherMaxTokens] = useAtom(otherMaxTokensAtom);

  const [text, setText] = React.useState('');
  const [error] = React.useState<string | undefined>(undefined);
  const [compareDUO, setCompareDUO] = React.useState(true);

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

  const questions = [
    'What are some of the main tourist attractions in San Francisco?',
    'What are the benefits of Yoga?',
    'How to cut a mango?',
    'What is the best time to visit Ladakh?',
    '강남역에서 가장 혼잡한 시간은 언제인가요?',
    'Where can I see the most fantastic night view in Seoul?',
    'अदरक के स्वास्थ्य लाभ क्या हैं?',
    'Dhokla kaise banate hai?',
    'एफिल टावर कितना पुराना है?',
    'ગોવામાં કયા દરિયાકિનારાઓ પર ઓછી ભીડ હોય છે?',
    'லடாக்குக்கு செல்ல சிறந்த நேரம் எது?',
    'কলকাতায় দুর্গাপূজা কীভাবে উদযাপিত হয়?',
    '서울에서 가장 환상적인 야경을 볼 수 있는 곳은 어디인가요?',
    'What is the tallest building in the world?',
    'चाय कैसे बनाते है?',
    '로마는 언제 건설되었나요?',
  ];

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
    if (ev && ev.code !== 'Enter') return;
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
        <div className="sticky top-0 flex h-screen w-72 flex-col gap-4 p-4">
          {/* SELECTS */}
          <>
            {/* Sutra model selection */}
            <Select
              aria-label="Select Sutra Model"
              placeholder="Select Sutra Model"
              labelPlacement="inside"
              label="Select Sutra Model"
              selectedKeys={[sutraModel.displayName]}
              classNames={{
                base: 'max-w-xs',
                trigger: 'h-12',
              }}
              renderValue={() => {
                return (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-small">{sutraModel.displayName}</span>
                    </div>
                  </div>
                );
              }}
            >
              {SUTRA_MODELS.map((m) => (
                <SelectItem key={m.displayName} textValue={m.displayName} onClick={() => changeSutra(m)}>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-small">{m.displayName}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </Select>

            {/* Sutra model selection  */}
            {compareDUO && (
              <Select
                aria-label="Select Other Model"
                placeholder="Select Other Model"
                labelPlacement="inside"
                label="Select Other Model"
                selectedKeys={[otherModel.displayName]}
                classNames={{
                  base: 'max-w-xs',
                  trigger: 'h-12',
                }}
                renderValue={() => {
                  return (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="text-small">{otherModel.displayName}</span>
                      </div>
                    </div>
                  );
                }}
              >
                {OTHER_MODELS.map((m) => (
                  <SelectItem key={m.displayName} textValue={m.displayName} onClick={() => changeOther(m)}>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="text-small">{m.displayName}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
          </>

          {/* SWITCHES */}
          <>
            <Switch isSelected={compareDUO} size="sm" onChange={() => setCompareDUO(!compareDUO)}>
              Compare Mode
            </Switch>
          </>
          <Button
            variant="bordered"
            color="primary"
            className="shadow-geniyablue/50 h-9 px-4 text-xl font-medium  shadow-lg hover:shadow-md"
            onClick={() => {
              const question = questions[Math.floor(Math.random() * questions.length)];
              setText(question);
            }}
          >
            random
          </Button>

          <Divider />
          <div className="absolute bottom-4 left-4 flex flex-col items-start gap-0 font-mono text-sm">
            <Image className="h-8" src="sutra.svg" />
            <div className="font-bold">PLAYGROUND {packageJson.version}</div>
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
            <Link isExternal showAnchorIcon size="sm" href="https://docs.two.ai">
              SUTRA API
            </Link>
          </div>
        </div>
        {/* 100vh */}
        <div className="z-10 flex h-screen max-h-screen w-full flex-col gap-3 p-4">
          {/* CHAT */}
          <div className="flex h-64 flex-1 flex-row justify-between gap-3">
            <Card className="w-full">
              <CardHeader className="flex gap-3">
                <Image alt="sutra" height={40} radius="sm" src={sutraModel.iconUrl} width={40} />
                <div className="flex flex-col">
                  <p className="text-md">{sutraModel.displayName}</p>
                  <p className="text-small text-default-500">{sutraModel.provider}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="py-5 text-xl font-semibold">{userInput}</p>
                <OutputViewSutra />
              </CardBody>
              <Divider />
              <CardFooter>
                <StatsView statsAtom={sutraStatsAtom} temperature={sutraTemperature} maxTokens={sutraMaxTokens} />
              </CardFooter>
            </Card>

            {compareDUO && (
              <Card className="w-full">
                <CardHeader className="flex gap-3">
                  <Image alt="nextui logo" height={40} radius="sm" src={otherModel.iconUrl} width={40} />
                  <div className="flex flex-col">
                    <p className="text-md">{otherModel.displayName}</p>
                    <p className="text-small text-default-500">{otherModel.provider}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="py-5 text-xl font-semibold">{userInput}</p>
                  <OutputViewOther />
                </CardBody>
                <Divider />
                <CardFooter>
                  <StatsView statsAtom={otherStatsAtom} temperature={otherTemperature} maxTokens={otherMaxTokens} />
                </CardFooter>
              </Card>
            )}
          </div>

          {error !== undefined && (
            <Card className="absolute top-0 z-10 max-w-sm self-center rounded-t-none">
              <CardBody>
                <div>{error}</div>
              </CardBody>
            </Card>
          )}

          {/* INPUT */}
          <Input
            isClearable
            variant="faded"
            placeholder="Ask Anything..."
            fullWidth
            size="lg"
            className="flex"
            defaultValue=""
            onClear={() => {
              console.log('input cleared');
              setText('');
            }}
            onChange={handleNewText}
            onKeyUp={issueNewText}
            value={text}
            autoFocus={true}
          />
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
