import React, { useState } from "react";
import packageJson from "../package.json";
import { useAtom } from "jotai";

import {
  Switch,
  Select,
  SelectItem,
  Input,
  Divider,
  Card,
  CardBody,
} from "@nextui-org/react";

import { 
  LLMChunk,
  LLMReply,
  MultilingualUserInput,
} from '@two-platforms/ion-multilingual-types';

// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./styles/chatui.css";

import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { IPv4, Location } from "./components/GeoInfo";
// import Ping from "./components/Ping";

// const darkMode = useDarkMode(true);

import { Sutra, SutraCallbacks } from './service/SutraClient';
import { SutraModel, SUTRA_MODELS, OTHER_MODELS } from "./service/SutraModels";

import {
  agentInfoAtom,
  sutraModelAtom,
  otherModelAtom,
} from "./state/atoms";

import { log } from './utils/log';

console.log(window.location.href);

const App = () => {
  const [sutraModel, setSutraModel] = useAtom(sutraModelAtom);
  const [otherModel, setOtherModel] = useAtom(otherModelAtom);

  const [userInput, setUserInput] = useState("");
  const [, setSutraInFlight] = useState(false);
  const [, setOtherInFlight] = useState(false);
 
  const [error, setError] = useState<string | undefined>(undefined);
  const [compareDUO, setCompareDUO] = useState(true);

  const errorRef = React.useRef<string | undefined>(undefined);

  const [time, setTime] = React.useState<Date>(new Date());

  React.useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  // // two potential error sources, show both if both erred
  // const addError = (errorMessage: string): void => {
  //   if (errorRef.current) {
  //     errorRef.current = errorRef.current + " | " + errorMessage;
  //   } else {
  //     errorRef.current = errorMessage;
  //   }
  //   setError(errorRef.current);
  // };

  const reset = (): void => {
    // override these (handy in case we're locked)
    setSutraInFlight(false);
    setOtherInFlight(false);
  };

  const changeSutra = (newModel: SutraModel): void => {
    reset();
    setSutraModel(newModel);
  };

  const changeOther = (newModel: SutraModel): void => {
    reset();
    setOtherModel(newModel);
  };

  const handleNewText = (ev: any): void => {
    setUserInput(ev.target.value);
  };

  const issueNewText = (ev: any) => {
    if (ev && ev.code !== "Enter") return;
    if (userInput.length === 0) return;

    sendToSutra(userInput);
    if (compareDUO) {
      sendToOther(userInput);
    }
  };

  // callbacks for streaming mode
  const sutraCallbacks: SutraCallbacks = {
    onLLMChunk: (v: LLMChunk) => {
      //answer.set((current) => current + v.content);
      log.info("onLLMChunk:", v.content);
      if (v.isFinal) setSutraInFlight(false);
    },
    onLLMReply: (v: LLMReply) => {
      //setllmMsec(v.llmMsec);
      //setQuerySuccess(v.success);
      log.info("onLLMReply:", v);
      if (v.isFinal) {
        //setAnswer(answer.get());
        setSutraInFlight(false);
      }
    },
    onError: (v: string) => {
      log.error("onError:", v);
      setSutraInFlight(false);
    },
  };

    // callbacks for streaming mode
    const otherCallbacks: SutraCallbacks = {
      onLLMChunk: (v: LLMChunk) => {
        //answer.set((current) => current + v.content);
        log.info("onLLMChunk:", v.content);
        if (v.isFinal) setOtherInFlight(false);
      },
      onLLMReply: (v: LLMReply) => {
        //setllmMsec(v.llmMsec);
        //setQuerySuccess(v.success);
        log.info("onLLMReply:", v);
        if (v.isFinal) {
          //setAnswer(answer.get());
          setOtherInFlight(false);
        }
      },
      onError: (v: string) => {
        log.error("onError:", v);
        setOtherInFlight(false);
      },
    };

  const sendToSutra = async (newText: string) => {
    errorRef.current = undefined;
    setError(undefined);
    setUserInput("");

    const request: MultilingualUserInput = {
      ...sutraModel,
      prompt: newText,
    };

    setSutraInFlight(true);
    await Sutra.postComplete(request, sutraCallbacks);
  };

  const sendToOther = async (newText: string) => {
    errorRef.current = undefined;
    setError(undefined);
    setUserInput("");

    const request: MultilingualUserInput = {
      ...otherModel,
      prompt: newText,
    };

    setSutraInFlight(true);
    await Sutra.postComplete(request, otherCallbacks);
  };

  return (
    <React.Fragment>
      {/* <main className="dark"> */}
      <div className="flex flex-row w-full bg-white">
        {/* MAIN PANEL */}
        {/* <div className="flex flex-col"> */}
        <BG />
        {/* 100vh */}
        <div className="flex flex-col h-screen w-full max-h-screen p-4 gap-3 z-10">
          {/* CHAT */}
          <div className="flex flex-row h-64 flex-1 justify-between gap-3">
            <MainContainer className="w-full rounded-xl shadow-lg" responsive>
              <ChatContainer>
                <ConversationHeader>
                  <ConversationHeader.Content
                    info={<div>Sutra {packageJson.version}</div>}
                  />

                  <ConversationHeader.Actions>
                    <div className="flex-row flex gap-2">
                      <img src="genie_logo.svg" className=" h-10" />
                    </div>
                  </ConversationHeader.Actions>
                </ConversationHeader>
              </ChatContainer>
            </MainContainer>

            {compareDUO && (
              <MainContainer className="w-full rounded-xl shadow-lg" responsive>
                <ChatContainer>
                  <ConversationHeader>
                    <ConversationHeader.Content
                      info={<div>Other LLMs</div>}
                    />
                    <ConversationHeader.Actions>
                      <img src="genie_logo.svg" className=" h-10" />
                    </ConversationHeader.Actions>
                  </ConversationHeader>
                </ChatContainer>
              </MainContainer>
            )}
          </div>

          {error !== undefined && (
            <Card className="absolute top-0 self-center z-10 max-w-sm rounded-t-none">
              <CardBody>
                <div>{error}</div>
              </CardBody>
            </Card>
          )}

          {/* INPUT */}
          <Input
            isClearable
            variant="faded"
            placeholder="Write your message"
            fullWidth
            size="lg"
            className="flex"
            defaultValue=""
            onClear={() => {
              console.log("input cleared");
              setUserInput("");
            }}
            onChange={handleNewText}
            onKeyUp={issueNewText}
            value={userInput}
            autoFocus={true}
          />
        </div>

        {/* MENU  */}

        <div className="flex flex-col w-72 gap-4 h-screen sticky p-4 top-0">
          {/* SELECTS */}
          <>
            {/* Sutra model selection */}
            <Select
              aria-label="Select Sutra Model"
              placeholder="Select Sutra Model"
              labelPlacement="outside"
              selectedKeys={[sutraModel.modelId]}
              classNames={{
                base: "max-w-xs",
                trigger: "h-12",
              }}
              renderValue={() => {
                return (
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">{sutraModel.modelId}</span>
                    </div>
                  </div>
                );
              }}
            >
              {SUTRA_MODELS.map((m) => (
                <SelectItem
                  key={m.modelId}
                  textValue={m.modelId}
                  onClick={() => changeSutra(m)}
                >
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">{m.modelId}</span>
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
                // labelPlacement="outside"
                selectedKeys={[otherModel.modelId]}
                classNames={{
                  base: "max-w-xs",
                  trigger: "h-12",
                }}
                renderValue={() => {
                  return (
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <span className="text-small">{otherModel.modelId}</span>
                      </div>
                    </div>
                  );
                }}
              >
                {OTHER_MODELS.map((m) => (
                  <SelectItem
                    key={m.modelId}
                    textValue={m.modelId}
                    onClick={() => changeOther(m)}
                  >
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <span className="text-small">{m.modelId}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
          </>

          {/* SWITCHES */}
          <Divider />
          <>
            <Switch
              isSelected={compareDUO}
              size="sm"
              onChange={() => setCompareDUO(!compareDUO)}
            >
              DUO Mode
            </Switch>
          </>

          <Divider />
          <div className="items-end font-mono flex flex-col text-xs absolute bottom-4 right-4">
            <div>GENIE {packageJson.version}</div>
            <div>
              {agentInfoAtom.os.name.toUpperCase()} |{" "}
              {agentInfoAtom.browser.name.toUpperCase()}
            </div>
            {/* <div>
              SERVER: <Ping />
            </div> */}
            <div>
              <Location /> | <IPv4 />
            </div>
            <div>
              {time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                day: "numeric",
                month: "short",
              })}
            </div>
          </div>
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
        <div className="animate-orbit2 absolute h-1/2 w-full">
          <div className="absolute left-[25%] top-[20%] w-[40%] rounded-full bg-blue-200 pb-[40%]"></div>
        </div>
        <div className="animate-orbit3 absolute h-full w-full">
          <div className="absolute left-[30%] top-[50%] w-[30%] rounded-full bg-gray-400 pb-[30%]"></div>
        </div>
        <div className="animate-orbit4 absolute h-full w-1/2">
          <div className="absolute left-[25%] top-[25%] w-[30%] rounded-full bg-white pb-[30%]"></div>
        </div>
      </div>
    </>
  );
};
