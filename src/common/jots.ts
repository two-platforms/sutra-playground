import { atom as jot } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { ALL_SERVERS } from "./IonServers";
import { IonServer } from "./IonCommon";
import { IonAtom, IonCrew, ALL_CREWS } from "./IonAtoms";
import { IonUser, ALL_USERS } from "./IonUsers";

import getAgent from "@egjs/agent";

const serverJot = jot(<IonServer>ALL_SERVERS[0]);
const userJot = atomWithStorage("genieuser", <IonUser>ALL_USERS[0]);
const crewJot = jot<IonCrew>(ALL_CREWS[0])
const atom1Jot = jot(<IonAtom>ALL_CREWS[0].atoms[0]);
const atom2Jot = jot(<IonAtom>ALL_CREWS[0].atoms[0]);
const agentInfoJot = jot(getAgent()).init;
const darkModeJot = atomWithStorage("darkMode", false);

// console.log(userJot);
// console.log(atom1Jot);
// console.log(atom2Jot);
// console.log(agentInfoJot);
// console.log(darkModeJot);

export {
  serverJot,
  crewJot,
  userJot,
  atom1Jot,
  atom2Jot,
  agentInfoJot,
  darkModeJot,
};
