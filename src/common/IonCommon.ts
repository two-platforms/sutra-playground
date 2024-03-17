import { IonUser } from './IonUsers';
import { IonAtom } from './IonAtoms';

export interface IonServerInfo {
    name: string;
    cloud: boolean;
    chatterName: string;
    chatterUrl: string;
    llmName: string;
    llmUrl: string;
};

export abstract class IonServer implements IonServerInfo {
    public name: string;
    public cloud: boolean;
    public chatterName: string;
    public chatterUrl: string;
    public llmName: string;
    public llmUrl: string; 

    constructor(info: IonServerInfo) {
        this.name = info.name;
        this.cloud = info.cloud;
        this.chatterName = info.chatterName;
        this.chatterUrl = info.chatterUrl;
        this.llmName = info.llmName;
        this.llmUrl = info.llmUrl;
    }

    abstract converse(url: string, req: ChatterConverseRequest): Promise<ChatterReply | ChatterError>;
    abstract saySomething(user: IonUser, atom: IonAtom): Promise<ChatterReply | ChatterError>;
    abstract getHistory(user: IonUser, atom: IonAtom): Promise<ChatterReply | ChatterError>;
    abstract forget(user: IonUser, atom: IonAtom): Promise<void>;
    abstract magic(user: IonUser, atom: IonAtom, stone: string, log: ChatEntry[]): Promise<ChatterReply | ChatterError>;
};

export type ChatEntry = {
    who: string;
    what: string;
};

export interface ChatterConverseRequest {   
    user: IonUser;
    atom: IonAtom; 
    userInput: string;    
    reasoning?: boolean;
}

export interface ChatterError {
    httpCode: number;
    errorMessage: string;
}

export interface ChatterReply {
    httpCode: number;
    userInput: string;
    response: string;
    chatterLog: ChatEntry[];
    reasoningReply?: string;
    context: any;
    memory: any;
    llm: any;   
    metrics?: string;
};

