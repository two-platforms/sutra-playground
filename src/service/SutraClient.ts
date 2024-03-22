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
    private static cfg: AxiosRequestConfig = import.meta.env.VITE_SUTRA_API_KEY
        ? { headers: { authorization: import.meta.env.VITE_SUTRA_API_KEY } }
        : { headers: {} };

    private static selectService(serviceName: SutraService): string {
        return `${K.SUTRA_SERVICE}/${serviceName}`;
    }

    // For Node need responseType header set to 'stream', this triggers a warning in browser, but can ignore
    private static makeStreamingConfig(): AxiosRequestConfig {
        const cfg: AxiosRequestConfig = { headers: Sutra.cfg.headers };
        if (typeof window === 'undefined') {
            cfg.responseType = 'stream';
        }
        return cfg;
    }

    public static async getStatus(): Promise<SutraServiceStatus | undefined> {
        const service = Sutra.selectService('multilingual');
        const url = `${service}/status`;

        try {
            const reply = await axios.get(url, Sutra.cfg);
            return reply.data as SutraServiceStatus;
        } catch (err: unknown) {
            log.error(err);
            return undefined;
        }
    }

    public static async postComplete(body: MultilingualUserInput, cbs: SutraCallbacks): Promise<void> {
        // special handling for sutra online model
        if(body.modelId === 'sutra-online') {
            Sutra.postSchat(body, cbs);
            return;
        }

        const service = Sutra.selectService('multilingual');
        const url = `${service}/completion`;
        const cfg = Sutra.makeStreamingConfig();

        log.info(url);

        try {
            const reply = await axios.post(url, body, cfg);
            const stream = reply.data as NodeJS.ReadableStream;
            Sutra.consumeStream(stream, cbs);
        } catch (err: unknown) {
            log.error(err);
            cbs.onError(JSON.stringify(err));
        }
    }

    private static async postSchat(body: MultilingualUserInput, cbs: SutraCallbacks): Promise<void> {
        const service = Sutra.selectService('online');
        const url = `${service}/schat`;
        const cfg = Sutra.makeStreamingConfig();

        log.info(url);
        const iolBody = { userInput: body.prompt };

        try {
            const reply = await axios.post(url, iolBody, cfg);
            const stream = reply.data as NodeJS.ReadableStream;
            Sutra.consumeStream(stream, cbs);
        } catch (err: unknown) {
            log.error(err);
            cbs.onError(JSON.stringify(err));
        }
    }

    private static async consumeStream(stream: NodeJS.ReadableStream, cbs: SutraCallbacks): Promise<void> {
        const { onLLMChunk, onLLMReply, onError } = cbs;
        let value = '';

        for await (const chunk of stream) {
            const lines = chunk.toString();
            const splits = lines.split('\n');

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
                    // using this causes RHS panel to wait for LHS
                    await sleep(10);
                    onLLMChunk(streamObj as LLMChunk);
                    /**/
                } else if (streamObj.typeName === 'LLMReply') {
                    onLLMReply(streamObj as LLMReply);
                    /**/

                // special handling for sutra online model
                } else if (streamObj.typeName === "MyLLMChunk") {
                    await sleep(10);
                    const llmChunk = streamObj as MyLLMChunk;
                    // V1 ion-online MyLLMChunk is same as ion-multilingual LLMChunk
                    onLLMChunk(llmChunk as LLMChunk);
                    /**/
                } else if (streamObj.typeName === "MyLLMReply") {
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
                        wordCount: 0
                    }
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
