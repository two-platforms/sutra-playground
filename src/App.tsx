import React from "react";
import packageJson from "../package.json";
import { useAtom } from "jotai";

import { Switch, Select, SelectItem, Input, Divider, Card, CardBody } from "@nextui-org/react";
import { MainContainer, ChatContainer, ConversationHeader } from "@chatscope/chat-ui-kit-react";

import "./styles/chatui.css";
import { OutputView } from "./components/OutputView";
import { IPv4, Location } from "./components/GeoInfo";
// import Ping from "./components/Ping";

// const darkMode = useDarkMode(true);

import { SutraModel, SUTRA_MODELS, OTHER_MODELS } from "./service/SutraModels";
import { agentInfoAtom, sutraModelAtom, otherModelAtom, userInputAtom } from "./state/atoms";

const App = () => {
  const [sutraModel, setSutraModel] = useAtom(sutraModelAtom);
  const [otherModel, setOtherModel] = useAtom(otherModelAtom);
  const [userInput, setUserInput] = useAtom(userInputAtom);

  const [text, setText] = React.useState("");
  const [error] = React.useState<string | undefined>(undefined);
  const [compareDUO, setCompareDUO] = React.useState(true);

  //const errorRef = React.useRef<string | undefined>(undefined);

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

  // const reset = (): void => {
  //   // override these (handy in case we're locked)
  //   setSutraInFlight(false);
  //   setOtherInFlight(false);
  // };

  const changeSutra = (newModel: SutraModel): void => {
    // reset();
    setSutraModel(newModel);
  };

  const changeOther = (newModel: SutraModel): void => {
    // reset();
    setOtherModel(newModel);
  };

  const handleNewText = (ev: any): void => {
    setText(ev.target.value);
  };

  const issueNewText = (ev: any) => {
    if (ev && ev.code !== "Enter") return;
    if (text.length === 0) return;

    setUserInput(text);
  };

  return (
    <React.Fragment>
      {/* <main className="dark"> */}
      <div className="flex w-full flex-row bg-white">
        {/* MAIN PANEL */}
        {/* <div className="flex flex-col"> */}
        <BG />
        {/* 100vh */}
        <div className="z-10 flex h-screen max-h-screen w-full flex-col gap-3 p-4">
          {/* CHAT */}
          <div className="flex h-64 flex-1 flex-row justify-between gap-3">
            <MainContainer className="w-full rounded-xl shadow-lg" responsive>
              <ChatContainer>
                <ConversationHeader>
                  <ConversationHeader.Content info={<div>Sutra {packageJson.version}</div>} />
                  <ConversationHeader.Actions>
                     <img src="genie_logo.svg" className=" h-10" />
                  </ConversationHeader.Actions>
                </ConversationHeader>
                <OutputView modelAtom={sutraModelAtom} />
              </ChatContainer>
            </MainContainer>

            {compareDUO && (
              <MainContainer className="w-full rounded-xl shadow-lg" responsive>
                <ChatContainer>
                  <ConversationHeader>
                    <ConversationHeader.Content info={<div>Other LLMs</div>} />
                    <ConversationHeader.Actions>
                      <img src="genie_logo.svg" className=" h-10" />
                    </ConversationHeader.Actions>
                  </ConversationHeader>
                  <OutputView modelAtom={otherModelAtom} />
                </ChatContainer>
              </MainContainer>
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
            placeholder="Write your message"
            fullWidth
            size="lg"
            className="flex"
            defaultValue=""
            onClear={() => {
              console.log("input cleared");
              setText("");
            }}
            onChange={handleNewText}
            onKeyUp={issueNewText}
            value={userInput}
            autoFocus={true}
          />
        </div>

        {/* MENU  */}

        <div className="sticky top-0 flex h-screen w-72 flex-col gap-4 p-4">
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
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-small">{sutraModel.modelId}</span>
                    </div>
                  </div>
                );
              }}
            >
              {SUTRA_MODELS.map((m) => (
                <SelectItem key={m.modelId} textValue={m.modelId} onClick={() => changeSutra(m)}>
                  <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="text-small">{otherModel.modelId}</span>
                      </div>
                    </div>
                  );
                }}
              >
                {OTHER_MODELS.map((m) => (
                  <SelectItem key={m.modelId} textValue={m.modelId} onClick={() => changeOther(m)}>
                    <div className="flex items-center gap-2">
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
            <Switch isSelected={compareDUO} size="sm" onChange={() => setCompareDUO(!compareDUO)}>
              DUO Mode
            </Switch>
          </>

          <Divider />
          <div className="absolute bottom-4 right-4 flex flex-col items-end font-mono text-xs">
            <div>GENIE {packageJson.version}</div>
            <div>
              {agentInfoAtom.os.name.toUpperCase()} | {agentInfoAtom.browser.name.toUpperCase()}
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
