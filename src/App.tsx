import React, { useState } from "react";
import packageJson from "../package.json";
import { useAtom as useJot } from "jotai";
import {
  userJot,
  crewJot,
  atom1Jot,
  atom2Jot,
  serverJot,
  agentInfoJot,
} from "./common/jots";

import {
  Button,
  Switch,
  Select,
  SelectItem,
  Avatar,
  Input,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Card,
  CardBody,
} from "@nextui-org/react";

import {
  FiGlobe,
  FiHelpCircle,
  FiInfo,
  FiLoader,
  FiSave,
  FiSend,
  FiX,
  FiBarChart2,
  FiDelete,
  FiClock,
  FiLink2,
  FiMapPin,
  FiMonitor,
  FiSmartphone,
} from "react-icons/fi";

import { ALL_SERVERS } from "./common/IonServers";
import { IonAtom, IonCrew, ALL_CREWS, ALL_TONES } from "./common/IonAtoms";
import { IonUser, ALL_USERS } from "./common/IonUsers";
import {
  ChatEntry,
  ChatterConverseRequest,
  ChatterReply,
  ChatterError,
  IonServer,
} from "./common/IonCommon";

// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./styles/chatui.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  Avatar as Avatar2,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { IPv4, Location } from "./components/GeoInfo";
import Ping from "./components/Ping";

const GBOT_NAME = "GPT3.5";

// const darkMode = useDarkMode(true);

let activeServers = ALL_SERVERS;
console.log(window.location.href);

if (
  typeof window !== "undefined" &&
  window.location.href.includes("https://")
) {
  activeServers = ALL_SERVERS.filter((p) => p.cloud);
}

const App = () => {
  const [server, setServer] = useJot(serverJot);
  const [user, setUser] = useJot(userJot);
  const [crew, setCrew] = useJot(crewJot);
  const [atom1, setAtom1] = useJot(atom1Jot);
  const [atom2, setAtom2] = useJot(atom2Jot);

  const [userInput, setUserInput] = useState("");
  const [tone, setTone] = useState(ALL_TONES[0]);
  const [chatterInFlight, setChatterInFlight] = useState(false);
  const [llmInFlight, setLlmInFlight] = useState(false);
  const [chatterLog1, setChatterLog1] = useState<ChatEntry[]>([]);
  const [chatterLog2, setChatterLog2] = useState<ChatEntry[]>([]);
  const [llmLog, setLlmLog] = useState<ChatEntry[]>([]);
  const [chatterReply1, setChatterReply1] = useState<ChatterReply | undefined>(
    undefined
  );
  const [chatterReply2, setChatterReply2] = useState<ChatterReply | undefined>(
    undefined
  );
  const [llmReply, setLlmReply] = useState<ChatterReply | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [compareGPT, setCompareGPT] = useState(false);
  const [compareDUO, setCompareDUO] = useState(false);
  const [COT, setCOT] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  const errorRef = React.useRef<string | undefined>(undefined);

  const [time, setTime] = React.useState<Date>(new Date());

  React.useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  React.useEffect(() => {
    const loadHistory1 = async () => {
      const reply = await server.getHistory(user, atom1);
      displayChatter1(reply);
    };
    setChatterLog1([]);
    loadHistory1();
  }, [user, atom1]);

  React.useEffect(() => {
    const loadHistory2 = async () => {
      const reply = await server.getHistory(user, atom2);
      displayChatter2(reply);
    };
    setChatterLog2([]);
    loadHistory2();
  }, [user, atom2]);

  // two potential error sources, show both if both erred
  const addError = (errorMessage: string): void => {
    if (errorRef.current) {
      errorRef.current = errorRef.current + " | " + errorMessage;
    } else {
      errorRef.current = errorMessage;
    }
    setError(errorRef.current);
    console.log("added");
  };

  const reset = (): void => {
    setChatterReply1(undefined);
    setChatterReply2(undefined);
    setLlmReply(undefined);

    // setChatterLog1(chatterReply);

    // override these (handy in case we're locked)
    setChatterInFlight(false);
    setLlmInFlight(false);
  };

  const changeServer = (newServer: IonServer): void => {
    reset();
    setServer(newServer);
  };

  const changeAtom1 = (newAtom: IonAtom): void => {
    reset();
    setAtom1(newAtom);
  };

  const changeAtom2 = (newAtom: IonAtom): void => {
    reset();
    setAtom2(newAtom);
  };

  const changeUser = (newUser: IonUser): void => {
    reset();
    setUser(newUser);
  };

  const changeCrew = (newCrew: IonCrew): void => {
    setCrew(newCrew);
    setAtom1(newCrew.atoms[0]);
    setAtom2(newCrew.atoms[0]);
  };

  const changeTone = (newTone: string): void => {
    setTone(newTone);
  };

  const handleNewText = (ev: any): void => {
    setUserInput(ev.target.value);
  };

  const issueNewText = (ev: any) => {
    if (ev && ev.code !== "Enter") return;
    if (userInput.length === 0) return;

    sendToChatter1(userInput);
    if (compareDUO) {
      sendToChatter2(userInput);
    }
    if (compareGPT) {
      sendToLlm(userInput);
    }
  };

  const sendToChatter1 = async (newText: string) => {
    errorRef.current = undefined;
    setError(undefined);
    setChatterReply1(undefined);
    chatterLog1.push({ who: user.name, what: newText });
    setUserInput("");

    const request: ChatterConverseRequest = {
      user: user,
      atom: atom1,
      userInput: newText,
      reasoning: COT,
    };

    setChatterInFlight(true);
    const reply = await server.converse(server.chatterUrl, request);
    setChatterInFlight(false);
    displayChatter1(reply);
  };

  const sendToChatter2 = async (newText: string) => {
    errorRef.current = undefined;
    setError(undefined);
    setChatterReply2(undefined);
    chatterLog2.push({ who: user.name, what: newText });
    setUserInput("");

    const request: ChatterConverseRequest = {
      user: user,
      atom: atom2,
      userInput: newText,
      reasoning: false,
    };

    setChatterInFlight(true);
    const reply = await server.converse(server.chatterUrl, request);
    setChatterInFlight(false);
    displayChatter2(reply);
  };

  const sendToLlm = async (newText: string) => {
    errorRef.current = undefined;
    setError(undefined);
    setLlmReply(undefined);
    llmLog.push({ who: user.name, what: newText });
    setUserInput("");

    const request: ChatterConverseRequest = {
      user: user,
      atom: atom1,
      userInput: newText,
    };

    setLlmInFlight(true);
    const reply = await server.converse(server.llmUrl, request);
    setLlmInFlight(false);

    if (reply.httpCode < 500) {
      const llmReply = reply as ChatterReply;
      setLlmReply(llmReply);
      llmLog.push({ who: GBOT_NAME, what: llmReply.response });
    } else {
      const errorReply = reply as ChatterError;
      addError(errorReply.errorMessage);
    }
  };

  const sendSayToChatter1 = async () => {
    errorRef.current = undefined;
    setError(undefined);
    setChatterReply1(undefined);
    setUserInput("");

    setChatterInFlight(true);
    const reply = await server.saySomething(user, atom1);
    setChatterInFlight(false);
    displayChatter1(reply);
  };

  // const sendMagicToChatter1 = async () => {
  //   errorRef.current = undefined;
  //   setError(undefined);
  //   setChatterReply1(undefined);
  //   setUserInput("");

  //   setChatterInFlight(true);
  //   const reply = await server.magic(user, atom1, tone, chatterLog1);
  //   setChatterInFlight(false);
  //   displayChatter1(reply);
  // };

  const sendMagicToChatter1 = async () => {
    errorRef.current = undefined;
    setError(undefined);
    const reply = (await server.magic(
      user,
      atom1,
      tone,
      chatterLog1
    )) as ChatterReply;
    if (reply.httpCode === 200) {
      setUserInput(reply.response?.toString());
    } else {
      const errorReply = reply as unknown as ChatterError;
      addError(errorReply.errorMessage);
    }
  };

  const sendSayToChatter2 = async () => {
    errorRef.current = undefined;
    setError(undefined);
    setChatterReply2(undefined);
    setUserInput("");

    setChatterInFlight(true);
    const reply = await server.saySomething(user, atom2);
    setChatterInFlight(false);
    displayChatter2(reply);
  };

  const forgetChatter1 = async () => {
    errorRef.current = undefined;
    setError(undefined);

    setChatterInFlight(true);
    await server.forget(user, atom1);
    setChatterInFlight(false);
  };

  const forgetChatter2 = async () => {
    errorRef.current = undefined;
    setError(undefined);

    setChatterInFlight(true);
    await server.forget(user, atom2);
    setChatterInFlight(false);
  };

  const displayChatter1 = (reply: ChatterReply | ChatterError) => {
    if (reply.httpCode === 200) {
      const newChatterReply = reply as ChatterReply;
      setChatterReply1(newChatterReply);
      setChatterLog1(newChatterReply.chatterLog);
      logReplyInfo(newChatterReply.chatterLog.length);
    } else {
      const errorReply = reply as ChatterError;
      // addError(errorReply.errorMessage);
    }
  };

  const displayChatter2 = (reply: ChatterReply | ChatterError) => {
    if (reply.httpCode === 200) {
      const newChatterReply = reply as ChatterReply;
      setChatterReply2(newChatterReply);
      setChatterLog2(newChatterReply.chatterLog);
    } else {
      const errorReply = reply as ChatterError;
      // addError(errorReply.errorMessage);
    }
  };

  const logReplyInfo = (n: number) => {
    const hasSummary = n % 2 === 1;
    const nTurns = hasSummary ? (n - 1) / 2 : n / 2;
    console.log(
      `${atom1.name} reply info: hasSummary=${hasSummary} nTurns=${nTurns}`
    );
  };

  const FormatLogList1 = (log: ChatEntry[]) => {
    const messageItems = log.map((c) => (
      <Message
        key={c.what}
        model={{
          position: "normal",
          message: c.what,
          sentTime: "just now",
          sender: c.who,
          direction: c.who == user.name ? "outgoing" : "incoming",
        }}
      >
        <Avatar2 src={c.who == user.name ? user.avatar : atom1.avatar} />
      </Message>
    ));
    return messageItems;
  };

  const FormatLogList2 = (log: ChatEntry[]) => {
    const messageItems = log.map((c) => (
      <Message
        model={{
          position: "normal",
          message: c.what,
          sentTime: "just now",
          sender: c.who,
          direction: c.who == user.name ? "outgoing" : "incoming",
        }}
      >
        <Avatar2 src={c.who == user.name ? user.avatar : atom2.avatar} />
      </Message>
    ));
    return messageItems;
  };

  const FormatLogListGPT = (log: ChatEntry[]) => {
    const messageItems = log.map((c) => (
      <Message
        model={{
          position: "normal",
          message: c.what,
          sentTime: "just now",
          sender: c.who,
          direction: c.who == user.name ? "outgoing" : "incoming",
        }}
      >
        <Avatar2 src={c.who == user.name ? user.avatar : "./openai.png"} />
      </Message>
    ));
    return messageItems;
  };

  const formatReasoning = (): string => {
    return chatterReply1?.reasoningReply ?? "";
  };

  const formatLLM = (): string => {
    if (!chatterReply1) return "";
    return JSON.stringify(chatterReply1.llm, null, 2);
  };

  const formatContext = (): string => {
    if (!chatterReply1) return "";
    return JSON.stringify(chatterReply1.context, null, 2);
  };

  const formatMemory = (): string => {
    if (!chatterReply1) return "";
    return JSON.stringify(chatterReply1.memory, null, 2);
  };

  const formatMetrics = (): string => {
    if (!chatterReply1) return "";
    return chatterReply1.metrics ?? "";
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
                  <Avatar2
                    src={atom1.avatar}
                    name={atom1.name}
                    status="available"
                  />
                  <ConversationHeader.Content
                    userName={
                      <div>
                        {atom1.name} & {user.name}
                      </div>
                    }
                    info={<div>GENIE {packageJson.version}</div>}
                  />

                  <ConversationHeader.Actions>
                    <div className="flex-row flex gap-2">
                      {COT && (
                        <Popover placement="bottom" showArrow={true}>
                          <PopoverTrigger>
                            <Button isIconOnly variant="light">
                              <FiInfo />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                {atom1.name} thinks...
                              </div>
                              <div className="text-tiny">
                                {formatReasoning()}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                      <img src="genie_logo.svg" className=" h-10" />
                    </div>
                  </ConversationHeader.Actions>
                </ConversationHeader>
                <MessageList>{FormatLogList1(chatterLog1)}</MessageList>
                {/* <MessageInput
                    placeholder="Type message here"
                    attachButton={false}
                  /> */}
              </ChatContainer>
            </MainContainer>

            {compareDUO && (
              <MainContainer className="w-full rounded-xl shadow-lg" responsive>
                <ChatContainer>
                  <ConversationHeader>
                    <Avatar2
                      src={atom2.avatar}
                      name={atom2.name}
                      size="md"
                      status="available"
                    />
                    <ConversationHeader.Content
                      userName={
                        <div>
                          {atom2.name} & {user.name}
                        </div>
                      }
                      info={<div>GENIE {packageJson.version}</div>}
                    />
                    <ConversationHeader.Actions>
                      <img src="genie_logo.svg" className=" h-10" />
                    </ConversationHeader.Actions>
                  </ConversationHeader>
                  <MessageList>{FormatLogList2(chatterLog2)}</MessageList>
                  {/* <MessageInput
                          placeholder="Type message here"
                          attachButton={false}
                        /> */}
                </ChatContainer>
              </MainContainer>
            )}

            {compareGPT && (
              <MainContainer className="w-full rounded-xl shadow-lg" responsive>
                <ChatContainer>
                  <ConversationHeader>
                    {/* <Avatar2 src={atom2.avatar} name={atom2.name} status="available" /> */}
                    <ConversationHeader.Content
                      userName={<div>{server.llmName}</div>}
                      info={<div>{server.llmName}</div>}
                    />
                    <ConversationHeader.Actions>
                      <img src="openai.png" className=" h-10" />
                    </ConversationHeader.Actions>
                  </ConversationHeader>
                  <MessageList>{FormatLogListGPT(llmLog)}</MessageList>
                  {/* <MessageInput
                          placeholder="Type message here"
                          attachButton={false}
                        /> */}
                </ChatContainer>
              </MainContainer>
            )}

            {showDebug && (
              <div className="font-mono text-sm w-full rounded-xl shadow-lg overflow-auto bg-black/20 p-4 flex-col flex gap-4">
                <div>
                  {/* <Divider /> */}
                  <div>
                    {time.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                  <div>GENIE {packageJson.version}</div>
                  <div>
                    {agentInfoJot.os.name.toUpperCase()} |{" "}
                    {agentInfoJot.browser.name.toUpperCase()} |{" "}
                    {agentInfoJot.browser.version.toUpperCase()} |{" "} 
                    <IPv4 /> |{" "}
                    <Location />
                    {/* <Divider /> */}
                  </div>
                </div>
                <div>
                  <FiLoader />
                  CONTEXT
                  <Divider />
                </div>
                <div>{formatContext()}</div>
                <div>
                  <FiSave />
                  MEMORY
                  <Divider />
                </div>
                <div>{formatMemory()}</div>
                <div>
                  <FiBarChart2 />
                  METRICS
                  <Divider />
                </div>
                <div>{formatMetrics()}</div>
                <div>
                  <FiGlobe />
                  ATOM INPUT SCHEMA
                  <Divider />
                </div>
                <div>{formatLLM()}</div>
                <div>
                  <FiHelpCircle />
                  CHAIN OF THOUGHTS
                  <Divider />
                </div>
                <div>{formatReasoning()}</div>
              </div>
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
            {/* user - selection: 1 */}
            <Select
              aria-label="Profile"
              placeholder="Select ID"
              // labelPlacement="outside"
              selectedKeys={[user.name]}
              classNames={{
                base: "max-w-xs",
                trigger: "h-12",
              }}
              renderValue={() => {
                return (
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={user.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={user.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{user.name}</span>
                      <span className="text-tiny text-default-400">
                        {user.gender}
                      </span>
                    </div>
                  </div>
                );
              }}
            >
              {ALL_USERS.map((u) => (
                <SelectItem
                  key={u.name}
                  textValue={u.name}
                  onClick={() => changeUser(u)}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={u.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={u.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{u.name}</span>
                      <span className="text-tiny text-default-400">
                        {u.gender}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </Select>

            {/* atom 1 - selection */}
            <Select
              aria-label="Select AI Friend"
              placeholder="Select AI Friend"
              labelPlacement="outside"
              selectedKeys={[atom1.name]}
              classNames={{
                base: "max-w-xs",
                trigger: "h-12",
              }}
              renderValue={() => {
                return (
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={atom1.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={atom1.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{atom1.name}</span>
                      <span className="text-tiny text-default-400">
                        {atom1.online ? "online" : "offline"}
                      </span>
                    </div>
                  </div>
                );
              }}
            >
              {crew.atoms.map((a) => (
                <SelectItem
                  key={a.name}
                  textValue={a.name}
                  onClick={() => changeAtom1(a)}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={a.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={a.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{a.name}</span>
                      <span className="text-tiny text-default-400">
                        {a.online ? "online" : "offline"}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </Select>

            {/* atom2 - selection  */}
            {compareDUO && (
              <Select
                aria-label="Select AI Friend"
                placeholder="Select AI Friend"
                // labelPlacement="outside"
                selectedKeys={[atom2.name]}
                classNames={{
                  base: "max-w-xs",
                  trigger: "h-12",
                }}
                renderValue={() => {
                  return (
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={atom2.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={atom2.avatar}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{atom2.name}</span>
                        <span className="text-tiny text-default-400">
                          {atom2.online ? "online" : "offline"}
                        </span>
                      </div>
                    </div>
                  );
                }}
              >
                {crew.atoms.map((a) => (
                  <SelectItem
                    key={a.name}
                    textValue={a.name}
                    onClick={() => changeAtom2(a)}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={a.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={a.avatar}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{a.name}</span>
                        <span className="text-tiny text-default-400">
                          {a.online ? "online" : "offline"}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
            {/* crew - selection */}
            <Divider />
            <Select
              label="Region"
              aria-label="Region"
              placeholder="Select a Region"
              labelPlacement="inside"
              selectedKeys={[crew.crewName]}
              className="max-w-xs"
              disableSelectorIconRotation
              size="sm"
            >
              {ALL_CREWS.map((c) => (
                <SelectItem
                  key={c.crewName}
                  value={c.crewName}
                  onClick={() => changeCrew(c)}
                >
                  {c.crewName}
                </SelectItem>
              ))}
            </Select>
            {/* tone - selection */}
            <Select
              label="AI Tone"
              aria-label="AI Tone"
              placeholder="Select a Tone"
              labelPlacement="inside"
              selectedKeys={[tone]}
              className="max-w-xs"
              disableSelectorIconRotation
              size="sm"
            >
              {ALL_TONES.map((t) => (
                <SelectItem key={t} value={t} onClick={() => changeTone(t)}>
                  {t}
                </SelectItem>
              ))}
            </Select>
            {/* server selection: 4 */}
            {activeServers.length > 1 && (
              <>
                <Select
                  label="Genie Server"
                  aria-label="Genie Server"
                  placeholder="Select Server"
                  labelPlacement="inside"
                  selectedKeys={[server.name]}
                  className="max-w-xs"
                  disableSelectorIconRotation
                  size="sm"
                >
                  {activeServers.map((p) => (
                    <SelectItem
                      key={p.name}
                      value={p.name}
                      onClick={() => changeServer(p)}
                    >
                      {p.name}
                    </SelectItem>
                  ))}
                </Select>
              </>
            )}
          </>

          {/* SWITCHES */}
          <Divider />
          <>
            <Switch
              isSelected={COT}
              size="sm"
              onChange={() => {
                setCOT(!COT);
              }}
            >
              Chain of Thoughts
            </Switch>
            <Switch
              isSelected={compareDUO}
              size="sm"
              onChange={() => setCompareDUO(!compareDUO)}
            >
              DUO Mode
            </Switch>
            <Switch
              isSelected={compareGPT}
              size="sm"
              onChange={() => setCompareGPT(!compareGPT)}
            >
              Compare to GPT
            </Switch>
            <Switch
              isSelected={showDebug}
              size="sm"
              onChange={() => setShowDebug(!showDebug)}
            >
              Show Debug Info
            </Switch>
          </>

          {/* BUTTONS */}
          <Divider />
          <div className="flex flex-row gap-2">
            <Button
              // isIconOnly
              variant="flat"
              size="sm"
              disabled={chatterInFlight}
              onClick={() => {
                sendSayToChatter1();
                if (compareDUO) {
                  sendSayToChatter2();
                }
              }}
            >
              SAY
            </Button>
            <Button
              variant="flat"
              size="sm"
              disabled={chatterInFlight}
              onClick={() => {
                sendMagicToChatter1();
              }}
            >
              MAGIC CHAT
            </Button>
            <div>{/* <ColorSchemeToggle id={undefined} /> */}</div>
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              disabled={chatterInFlight}
              onClick={() => {
                forgetChatter1();
                setChatterLog1([]);
                if (compareDUO) {
                  forgetChatter2();
                  setChatterLog2([]);
                }
              }}
            >
              <FiDelete />
            </Button>
          </div>

          <div className="items-end font-mono flex flex-col text-xs absolute bottom-4 right-4">
            <div>GENIE {packageJson.version}</div>
            <div>
              {agentInfoJot.os.name.toUpperCase()} |{" "}
              {agentInfoJot.browser.name.toUpperCase()}
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
