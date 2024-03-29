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
    parameters?: string;
}

export interface SutraStats {
    ttftService: number; // time to first token, measured on sutra-server
    ttltService: number; // time to last token, measured on sutra-server
    ttftClient: number; // time to first token, measured on client
    ttltClient: number; // time to last token, measured on client
    tps: number; // tokens per second, measured on client
    tokenCount: number; // number of tokens in the generated content
    wordCount: number; // number of words in the generated content
    enTranslation?: string; // English translation of the generated content
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
        displayName: 'SUTRA-LIGHT',
        modelId: 'sutra-9B-multilingual',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '9B',
    },
    {
        displayName: 'SUTRA-LIGHT2',
        modelId: 'sutra-50B-multilingual',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '50B',
    },
    {
        displayName: 'SUTRA-TURBO',
        modelId: 'sutra-multilingual-turbo',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '50B',
    },
    {
        displayName: 'SUTRA-ONLINE',
        modelId: 'sutra-online',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '50B',
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
        parameters: '~175B',
    },
    {
        displayName: 'GPT-4',
        modelId: 'GPT4',
        provider: 'OpenAI',
        iconUrl: 'openai.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '~1760B',
    },
    {
        displayName: 'HYPER-CLOVA-X',
        modelId: 'HyperClovaX',
        provider: 'Naver',
        iconUrl: 'naver.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: 'N/A',
    },
    {
        displayName: 'MIXTRAL-8x7B',
        modelId: 'mixtral-8x7b-instruct',
        provider: 'Mistral',
        iconUrl: 'mistral.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '45B',
    },
    {
        displayName: 'PERPLEXITY CHAT',
        modelId: 'sonar-medium-chat',
        provider: 'Perplexity',
        iconUrl: 'perplexity.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '45B',
    },
    {
        displayName: 'PERPLEXITY ONLINE',
        modelId: 'sonar-medium-online',
        provider: 'Perplexity',
        iconUrl: 'perplexity.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
        parameters: '45B',
    },
];

export function buildCompletionRequest(prompt: string, model: SutraModel): MultilingualUserInput {
    const { modelId, temperature, maxTokens } = model;
    return { prompt, modelId, temperature, maxTokens };
}
