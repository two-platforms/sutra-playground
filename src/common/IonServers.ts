import { IonServer } from "./IonCommon";
import { OrbytServerImpl } from "../sdk/OrbytServerImpl";

// Note - orbyt must be running in debug mode for this to work

export const ALL_SERVERS: IonServer[] = [
  new OrbytServerImpl({
    name: "Staging KR",
    cloud: true,
    chatterName: "Orbyt 6.2",
    chatterUrl: "https://orbyt-server-tyydmagh4a-du.a.run.app", 
    llmName: "GPT 3.5-Turbo",
    llmUrl: "send-bypass-request",
  }),
  new OrbytServerImpl({
    name: "Staging IN",
    cloud: true,
    chatterName: "Orbyt 6.2",
    chatterUrl: "https://orbyt-server-tyydmagh4a-el.a.run.app",
    llmName: "GPT 3.5-Turbo",
    llmUrl: "send-bypass-request",
  }),
  new OrbytServerImpl({
    name: "Staging US",
    cloud: true,
    chatterName: "Orbyt 6.2",
    chatterUrl: "https://orbyt-server-tyydmagh4a-uw.a.run.app", 
    llmName: "GPT 3.5-Turbo",
    llmUrl: "send-bypass-request",
  }),

  // something broke filtering when on-cloud
  // it was happening in two places: Chatter.tsx, jotaiAtom.ts
  // and picking up [lab2], the last one
  // to avoid removed filtering from jotaiAtom.ts
  // but FIRST ENTRY MUST HAVE cloud: true

  // new OrbytServerImpl({
  //   name: "Orbyt Lab1",
  //   cloud: false,
  //   chatterName: "Orbyt 6.2",
  //   chatterUrl: " http://192.168.21.15:9000",
  //   llmName: "GPT 3.5-Turbo",
  //   llmUrl: "send-bypass-request",
  // }),

  // new OrbytServerImpl({
  //   name: "Orbyt Lab2",
  //   cloud: false,
  //   chatterName: "Orbyt 6.2",
  //   chatterUrl: " http://192.168.21.38:9099",
  //   llmName: "GPT 3.5-Turbo",
  //   llmUrl: "send-bypass-request",
  // }),
];
