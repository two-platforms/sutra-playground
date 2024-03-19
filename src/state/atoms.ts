import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import getAgent from '@egjs/agent';

import { SutraModel, SutraStats, initStats, SUTRA_MODELS, OTHER_MODELS } from '../service/SutraModels';

const agentInfoAtom = atom(getAgent()).init;
const darkModeAtom = atomWithStorage('darkMode', false);
const userInputAtom = atom('');

const sutraModelAtom = atom<SutraModel>(SUTRA_MODELS[0]);
const sutraTemperatureAtom = atom(SUTRA_MODELS[0].temperature);
const sutraMaxTokensAtom = atom(SUTRA_MODELS[0].maxTokens);
const sutraStatsAtom = atom<SutraStats>(initStats());
const sutraLoadingAtom = atom(false);
const sutraAnswerAtom = atom('');

const otherModelAtom = atom<SutraModel>(OTHER_MODELS[0]);
const otherTemperatureAtom = atom(OTHER_MODELS[0].temperature);
const otherMaxTokensAtom = atom(OTHER_MODELS[0].maxTokens);
const otherStatsAtom = atom<SutraStats>(initStats());
const otherLoadingAtom = atom(false);
const otherAnswerAtom = atom('');

export {
    agentInfoAtom,
    darkModeAtom,
    userInputAtom,

    sutraModelAtom,
    sutraTemperatureAtom,
    sutraMaxTokensAtom,
    sutraStatsAtom,
    sutraLoadingAtom,
    sutraAnswerAtom,

    otherModelAtom,
    otherTemperatureAtom,
    otherMaxTokensAtom,
    otherStatsAtom,
    otherLoadingAtom,
    otherAnswerAtom,
};
