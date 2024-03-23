import { LLMChunk, LLMReply, MultilingualUserInput } from '@two-platforms/ion-multilingual-types';
import { Sutra, SutraCallbacks } from '../service/SutraClient';
import { K } from '../utils/K';
import { describe, it } from 'vitest';

const callbacks: SutraCallbacks = {
    onLLMChunk: (_v: LLMChunk) => {}, //console.log('onLLMChunk', v),
    onLLMReply: (_v: LLMReply) => {}, //console.log('onLLMReply:', v),
    onError: (v: string) => console.error('onError:', v),
};

describe('GPT3.5 completion stream tests', () => {
    const request: MultilingualUserInput = {
        modelId: 'GPT3.5',
        prompt: 'Explain how to fly a plane',
    };
    it('can consume stream', async () => {
        await Sutra.postComplete(K.SUTRA_SERVICE_US, request, callbacks);
    });
});
