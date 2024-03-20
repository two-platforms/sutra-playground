import { MultilingualUserInput } from '@two-platforms/ion-multilingual-types';

export const DEFAULT_TEMPERATURE = 0.6;
export const DEFAULT_MAXTOKENS = 1024;

export interface SutraModel {
    displayName: string;
    modelId: string;
    provider: string;
    iconUrl: string;
    temperature: number;
    maxTokens: number;
}

export interface SutraStats {
    ttftService: number;        // time to first token, measured on sutra-server
    ttltService: number;        // time to last token, measured on sutra-server
    ttftClient: number;         // time to first token, measured on client
    ttltClient: number;         // time to last token, measured on client
    tps: number;                // tokens per second, measured on client
    tokenCount: number;         // number of tokens in the generated content
    wordCount: number;          // number of words in the generated content
}

export function initStats(): SutraStats {
    return {
        ttftService: 0,
        ttltService: 0,
        ttftClient: 0,
        ttltClient: 0,
        tps: 0,
        tokenCount: 0,
        wordCount: 0,
    };
}

export const SUTRA_MODELS: SutraModel[] = [
    {
        displayName: 'SUTRA-TURBO',
        modelId: 'sutra-multilingual-turbo',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'SUTRA-50B',
        modelId: 'sutra-50B-multilingual',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'SUTRA-9B',
        modelId: 'sutra-9B-multilingual',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
];

export const OTHER_MODELS: SutraModel[] = [
    {
        displayName: 'GPT-3.5',
        modelId: 'GPT3.5',
        provider: 'OpenAI',
        iconUrl: 'openai.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'GPT-4',
        modelId: 'GPT4',
        provider: 'OpenAI',
        iconUrl: 'openai.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'MIXTRAL-13B',
        modelId: 'Mixtral13B',
        provider: 'Mistral',
        iconUrl: 'mistral.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'HYPER-CLOVA-X',
        modelId: 'HyperClovaX',
        provider: 'Naver',
        iconUrl: 'naver.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,

    },
    {
        displayName: 'PERPLEXITY-ONLINE',
        modelId: 'Perplexity',
        provider: 'Perplexity',
        iconUrl: 'perplexity.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
];

export function buildCompletionRequest(prompt: string, model: SutraModel): MultilingualUserInput {
    const { modelId, temperature, maxTokens } = model;
    return { prompt, modelId, temperature, maxTokens };
}
