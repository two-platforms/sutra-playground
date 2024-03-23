import axios, { AxiosRequestConfig } from 'axios';

import { IonStreamObject, LLMChunk, LLMReply, MultilingualUserInput } from '@two-platforms/ion-multilingual-types';
import { MyLLMChunk, MyLLMReply } from '@two-platforms/ion-online-types';

import { log } from '../utils/log';
import { K } from '../utils/K';

// will come from sutra types
export type SutraServiceStatus = {
    serviceName: 'multilingual' | 'online';
    sericeStatus: 'operational' | 'maintenance';
    counterName: 'inferences' | 'queries';
    counterValue: number;
};

export type OnLLMChunk = (v: LLMChunk) => void;
export type OnLLMReply = (v: LLMReply) => void;
export type OnError = (v: string) => void;

export type SutraCallbacks = {
    onLLMChunk: OnLLMChunk;
    onLLMReply: OnLLMReply;
    onError: OnError;
};

export type SutraService = 'multilingual' | 'online';

// static class
export class Sutra {
    // TODO, use with node/vitest
    private static cfgAxios: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            // Accept: 'application/x-ndjson',
            'Content-Type': 'application/json',
            authorization: import.meta.env.VITE_SUTRA_API_KEY,
        },
        responseType: 'stream',
    };

    // use with borwser
    private static cfgFetch = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: import.meta.env.VITE_SUTRA_API_KEY,
    };

    private static selectService(serviceName: SutraService): string {
        return `${K.SUTRA_SERVICE}/${serviceName}`;
    }

    public static async getStatus(): Promise<SutraServiceStatus | undefined> {
        const service = Sutra.selectService('multilingual');
        const url = `${service}/status`;

        try {
            const reply = await axios.get(url, Sutra.cfgAxios);
            return reply.data as SutraServiceStatus;
        } catch (err: unknown) {
            log.error(err);
            return undefined;
        }
    }

    // TODO - node and browser variants
    public static async postComplete(body: MultilingualUserInput, cbs: SutraCallbacks): Promise<void> {
        // special handling for sutra online model
        if (body.modelId === 'sutra-online') {
            Sutra.postSchat(body, cbs);
            return;
        }

        const service = Sutra.selectService('multilingual');
        const url = `${service}/completion`;

        log.info(url);

        try {
            const tStart = Date.now();
            const response = await window.fetch(url, {
                method: 'POST',
                headers: Sutra.cfgFetch,
                body: JSON.stringify(body),
            });
            const stream = response.body;
            await Sutra.consumeStream(stream, cbs, tStart);
        } catch (err: unknown) {
            log.error(err);
            cbs.onError(JSON.stringify(err));
        }
    }

    private static async postSchat(body: MultilingualUserInput, cbs: SutraCallbacks): Promise<void> {
        const service = Sutra.selectService('online');
        const url = `${service}/schat`;

        log.info(url);
        const iolBody = { userInput: body.prompt };

        try {
            const tStart = Date.now();
            const response = await window.fetch(url, {
                method: 'POST',
                headers: Sutra.cfgFetch,
                body: JSON.stringify(iolBody),
            });
            const stream = response.body;
            await Sutra.consumeStream(stream, cbs, tStart);
        } catch (err: unknown) {
            log.error(err);
            cbs.onError(JSON.stringify(err));
        }
    }

    // this is the fetch version of consumeStream, axios version has been removed since it seemed to stall in browser
    private static async consumeStream(
        stream: ReadableStream<Uint8Array> | null,
        cbs: SutraCallbacks,
        _tStart: number,
    ): Promise<void> {
        const { onLLMChunk, onLLMReply, onError } = cbs;
        const decoder = new TextDecoder();
        let value = '';

        if (stream === null) return;
        const reader = stream.getReader();

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const chunk = await reader.read();
            if (chunk === null || chunk.done) {
                console.log('******** stream closed');
                // send a final chunk, needed for non-streming models
                onLLMChunk({ typeName: 'LLMChunk', isFinal: true, content: '' });
                return;
            }

            const lines = decoder.decode(chunk.value);
            const splits = lines.split('\n');
            // console.log('chunk', lines, Date.now() - _tStart);

            // check if full chunk is a partial object
            if (splits.length === 1) {
                value += splits[0];
                continue;
            }

            for (let idx = 0; idx < splits.length; idx++) {
                value += splits[idx];

                // ignore whitespace
                if (value.trim().length === 0) continue;

                // check if last split is a partial object by comparing against '',
                // if no match then last split is a partial object
                if (idx === splits.length - 1 && splits[idx] !== '') {
                    continue;
                }

                const streamObj = JSON.parse(value) as IonStreamObject;

                if (streamObj.typeName === 'LLMChunk') {
                    await sleep(10);
                    onLLMChunk(streamObj as LLMChunk);
                    /**/
                } else if (streamObj.typeName === 'LLMReply') {
                    onLLMReply(streamObj as LLMReply);
                } else if (streamObj.typeName === 'MyLLMChunk') {
                    // special handling for sutra online model
                    // V1 ion-online MyLLMChunk is same as ion-multilingual LLMChunk
                    await sleep(10);
                    const llmChunk = streamObj as MyLLMChunk;
                    onLLMChunk(llmChunk as LLMChunk);
                    /**/
                } else if (streamObj.typeName === 'MyLLMReply') {
                    const myLLMreply = streamObj as MyLLMReply;
                    const llmReply: LLMReply = {
                        typeName: 'LLMReply',
                        isFinal: true,
                        requestId: 'requestId',
                        userInput: {
                            modelId: 'sutra-online',
                            prompt: myLLMreply.userInput,
                        },
                        success: true,
                        ttftMsec: 100,
                        ttltMsec: myLLMreply.llmMsec,
                        errMsg: myLLMreply.errMsg,
                        tokenCount: 0,
                        wordCount: 0,
                    };
                    onLLMReply(llmReply);
                } else {
                    onError(`unknown stream object ${streamObj.typeName}`);
                }
                value = '';
            }
        }
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
