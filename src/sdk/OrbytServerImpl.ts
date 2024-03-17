// Copyright © 2023 Two Platforms Inc. All rights reserved.

import * as jose from 'jose'

import { OrbytClient, OrbytErrorReply } from '@two-platforms/orbyt';
import { ChatType, ChatRequest, ChatReply } from '@two-platforms/orbyt';
import { SayRequest, SayReply } from '@two-platforms/orbyt';
import { HistoryRequest, HistoryReply } from '@two-platforms/orbyt';
import { ForgetRequest } from '@two-platforms/orbyt';
import { MagicRequest, MagicReply } from '@two-platforms/orbyt';
import { IonDebugInfo, ConversationLine } from '@two-platforms/ionchat';

import { IonServer, IonServerInfo } from '../common/IonCommon';
import { ChatterConverseRequest, ChatterReply, ChatterError } from '../common/IonCommon';
import { ChatEntry } from '../common/IonCommon';

import { IonUser } from '../common/IonUsers';
import { IonAtom } from '../common/IonAtoms';

export class OrbytServerImpl extends IonServer {

    constructor(info: IonServerInfo) {
        super(info);

        OrbytClient.setUrl(this.chatterUrl);
        OrbytClient.setApiKey('set_this_from_env_file');

        // LLM requests can take 10+ seconds
        // IonChat has a 15 second timeout for GPT-4 and 10 seconds for other models
        // however IonChat will retry twice, so total Orbyt wait could be 30 seconds
        // incresed to 40 seconds, should see API GW timeout first

        OrbytClient.setTimeout(40000);
    }

    public async converse(url: string, req: ChatterConverseRequest): Promise<ChatterReply | ChatterError> {

        const { atom, user } = req;

        if (!atom.online) {
            return { httpCode: 500, errorMessage: `${atom.name} is offline.` };
        }

        // ChatterConverseRequest -> Orbyt ChatRequest
        const orbytChatRequest: ChatRequest = {
            userId: user.userId,
            userName: user.name,
            atomId: atom.atomId,
            atomName: atom.name,
            userInput: req.userInput,
            userGender: user.gender,
            chatType: ChatType.Text,
            showReasoning: req.reasoning,
        };

        // check if we have bypass request
        if (url === this.llmUrl) {

            orbytChatRequest.ionBypass = true;

            const reply = await OrbytClient.chat(orbytChatRequest);
            if (reply.httpCode !== 200) {
                const err = reply as OrbytErrorReply;
                return { httpCode: err.httpCode, errorMessage: err.errorMessage };
            }

            // Orbyt chatReply -> chatterReply
            const orbytReply = reply as ChatReply;

            const chatterLog: ChatEntry[] = [];
            chatterLog.push({ who: user.name, what: req.userInput });
            chatterLog.push({ who: atom.name, what: orbytReply.atomResponse.dialog });

            const chatterReply: ChatterReply = {
                httpCode: orbytReply.httpCode,
                userInput: orbytReply.userInput,
                response: orbytReply.atomResponse.dialog,
                chatterLog: chatterLog,
                llm: undefined,
                context: undefined,
                memory: undefined,
                reasoningReply: undefined,
                metrics: undefined,
            };

            return chatterReply;
        }

        // non-bypass request

        const reply = await OrbytClient.chat(orbytChatRequest);

        if (reply.httpCode !== 200) {
            const err = reply as OrbytErrorReply;
            return { httpCode: err.httpCode, errorMessage: err.errorMessage };
        }

        const orbytChatReply = reply as ChatReply;

        const ionDebugInfo = orbytChatReply.ionDebugInfo
            ? orbytChatReply.ionDebugInfo as IonDebugInfo
            : undefined;

        const chatterLog: ChatEntry[] = [];

        // put the summary at the beginning if present
        if (ionDebugInfo?.currentSummary) {
            chatterLog.push({ who: atom.name, what: ionDebugInfo?.currentSummary });
        }

        if (ionDebugInfo?.sessionHistory) {
            ionDebugInfo?.sessionHistory.forEach((c) => {
                const c2 = c.replace('\n', '')
                if (c2.startsWith('You: ')) {
                    chatterLog.push({ who: atom.name, what: c2.replace('You: ', '') });
                }
                else if (c2.startsWith('Friend: ')) {
                    chatterLog.push({ who: user.name, what: c2.replace('Friend: ', '') });
                }
            });
        }

        // Orbyt ChatReply -> ChatterReply
        const chatterReply: ChatterReply = {
            httpCode: orbytChatReply.httpCode,
            userInput: orbytChatReply.userInput,
            response: orbytChatReply.atomResponse.dialog,
            chatterLog: chatterLog,
            llm: ionDebugInfo?.llm,
            context: ionDebugInfo?.atomContext,
            memory: ionDebugInfo?.userMemory,
            reasoningReply: orbytChatReply.atomResponse.reasoning,
            metrics: orbytChatReply.chatMetrics ? JSON.stringify(orbytChatReply.chatMetrics, null, 2) : undefined,
        }

        return chatterReply;
    }

    public async saySomething(user: IonUser, atom: IonAtom): Promise<ChatterReply | ChatterError> {

        if (!atom.online) {
            return { httpCode: 500, errorMessage: `${atom.name} is offline.` };
        }

        // ChatterSayRequest -> Orbyt SayRequest
        const orbytSayRequest: SayRequest = {
            userId: user.userId,
            userName: user.name,
            atomId: atom.atomId,
            atomName: atom.name,
            userGender: user.gender,
            chatType: ChatType.Text,
        };

        const reply = await OrbytClient.say(orbytSayRequest);
        if (reply.httpCode !== 200) {
            const err = reply as OrbytErrorReply;
            return { httpCode: err.httpCode, errorMessage: err.errorMessage };
        }

        const orbytSayReply = reply as SayReply;

        const ionDebugInfo = orbytSayReply.ionDebugInfo
            ? orbytSayReply.ionDebugInfo as IonDebugInfo
            : undefined;

        const chatterLog: ChatEntry[] = [];

        // put the summary at the beginning if present
        if (ionDebugInfo?.currentSummary) {
            chatterLog.push({ who: atom.name, what: ionDebugInfo?.currentSummary });
        }

        if (ionDebugInfo?.sessionHistory) {
            ionDebugInfo?.sessionHistory.forEach((c) => {
                const c2 = c.replace('\n', '')
                if (c2.startsWith('You: ')) {
                    chatterLog.push({ who: atom.name, what: c2.replace('You: ', '') });
                }
                else if (c2.startsWith('Friend: ')) {
                    chatterLog.push({ who: user.name, what: c2.replace('Friend: ', '') });
                }
            });
        }

        // Orbyt SayReply -> ChatterReply
        const chatterReply: ChatterReply = {
            httpCode: orbytSayReply.httpCode,
            userInput: '',
            response: orbytSayReply.atomResponse.dialog,
            chatterLog: chatterLog,
            llm: ionDebugInfo?.llm,
            context: ionDebugInfo?.atomContext,
            memory: ionDebugInfo?.userMemory,
            reasoningReply: orbytSayReply.atomResponse.reasoning,
            metrics: orbytSayReply.chatMetrics ? JSON.stringify(orbytSayReply.chatMetrics, null, 2) : undefined,
        }

        return chatterReply;
    }

    public async getHistory(user: IonUser, atom: IonAtom): Promise<ChatterReply | ChatterError> {

        const historyRequest: HistoryRequest = {
            userId: user.userId,
            atomId: atom.atomId,
        };

        const reply = await OrbytClient.history(historyRequest);
        if (reply.httpCode !== 200) {
            const err = reply as OrbytErrorReply;
            return { httpCode: err.httpCode, errorMessage: err.errorMessage };
        }

        const historyReply = reply as HistoryReply;

        const chatterLog: ChatEntry[] = [];

        // put the summary at the beginning if present
        if (historyReply.currentSummary) {
            chatterLog.push({ who: atom.name, what: historyReply.currentSummary });
        }

        historyReply.sessionHistory.forEach((c) => {
            const c2 = c.replace('\n', '')
            if (c2.startsWith('You: ')) {
                chatterLog.push({ who: atom.name, what: c2.replace('You: ', '') });
            }
            else if (c2.startsWith('Friend: ')) {
                chatterLog.push({ who: user.name, what: c2.replace('Friend: ', '') });
            }
        });

        // Orbyt HistoryReply -> ChatterReply
        const chatterReply: ChatterReply = {
            httpCode: historyReply.httpCode,
            userInput: '',
            response: '',
            chatterLog: chatterLog,
            llm: undefined,
            context: undefined,
            memory: undefined,
            reasoningReply: undefined,
            metrics: undefined,
        }

        return chatterReply;
    }

    public async forget(user: IonUser, atom: IonAtom): Promise<void> {

        const forgetRequest: ForgetRequest = {
            userId: user.userId,
            atomId: atom.atomId,
        };

        await OrbytClient.forget(forgetRequest);
    }

    public async magic(user: IonUser, atom: IonAtom, selectedTone: string, log: ChatEntry[]): Promise<ChatterReply | ChatterError> {

        const zabPayload = {
            userId: user.userId,
            userName: user.name,
            atomId: atom.atomId,
            atomName: atom.name,
        };

        const secret = new TextEncoder().encode('set_this_from_env_file');
        const alg = 'HS256';
        const token = await new jose.SignJWT(zabPayload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('1d')
            .sign(secret);

        const history: ConversationLine[] = [];
        log.forEach(ce => history.push({ role: ce.who, content: ce.what }));

        const magicRequest: MagicRequest = {
            history: history.slice(-5),
            tone: selectedTone === 'standard' ? undefined : selectedTone,
        };

        OrbytClient.setSpeakToken(token);
        const reply = await OrbytClient.magic(magicRequest);
        OrbytClient.setApiKey('set_this_from_env_file');

        if (reply.httpCode !== 200) {
            const err = reply as OrbytErrorReply;
            return { httpCode: err.httpCode, errorMessage: err.errorMessage };
        }

        const magicReply = reply as MagicReply;

        console.log(magicReply);


        const chatterReply: ChatterReply = {
            httpCode: 200,
            userInput: '',
            response: magicReply.content,
            chatterLog: log,
            llm: undefined,
            context: undefined,
            memory: undefined,
            reasoningReply: undefined,
            metrics: undefined,
        };

        return chatterReply;
    }
}
