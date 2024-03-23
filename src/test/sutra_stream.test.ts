import { LLMChunk, LLMReply, MultilingualUserInput } from '@two-platforms/ion-multilingual-types';
import { Sutra, SutraCallbacks } from '../service/SutraClient';
import { describe, it } from 'vitest';

const callbacks: SutraCallbacks = {
    onLLMChunk: (_v: LLMChunk) => {}, //console.log('onLLMChunk', v),
    onLLMReply: (_v: LLMReply) => {}, //console.log('onLLMReply:', v),
    onError: (v: string) => console.error('onError:', v),
};

describe('sutra completion stream test', () => {
    const request: MultilingualUserInput = {
        modelId: 'sutra-9B-multilingual',
        prompt: 'Explain how to fly a plane',
    };
    it('can consume stream', async () => {
        await Sutra.postComplete(request, callbacks);
    });
});
