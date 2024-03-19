import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import getAgent from '@egjs/agent';

import { SutraModel, SUTRA_MODELS, OTHER_MODELS } from '../service/SutraModels';

const agentInfoAtom = atom(getAgent()).init;
const darkModeAtom = atomWithStorage('darkMode', false);
const sutraModelAtom = atom<SutraModel>(SUTRA_MODELS[0]);
const otherModelAtom = atom<SutraModel>(OTHER_MODELS[0]);

export {
  agentInfoAtom,
  darkModeAtom,
  sutraModelAtom,
  otherModelAtom
};
