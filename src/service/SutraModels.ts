import { MultilingualUserInput } from '@two-platforms/ion-multilingual-types';

export const DEFAULT_TEMPERATURE = 0.3;
export const DEFAULT_MAXTOKENS = 1024;

export interface SutraModel {
    displayName: string;
    modelId: string;
    provider: string;
    iconUrl: string;
    temperature: number;
    maxTokens: number;
}

export const SUTRA_MODELS: SutraModel[] = [
    {
        displayName: 'SUTRA LARGE',
        modelId: 'sutra-50B-multilingual',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'SUTRA SMALL',
        modelId: 'sutra-9B-multilingual',
        provider: 'TWO.AI',
        iconUrl: 'genie.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
];

export const OTHER_MODELS: SutraModel[] = [
    {
        displayName: 'OTHER1',
        modelId: 'GPT4',
        provider: 'OpenAI',
        iconUrl: 'openai.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'OTHER2',
        modelId: 'GPT3.5',
        provider: 'OpenAI',
        iconUrl: 'openai.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'OTHER3',
        modelId: 'Mixtral13B',
        provider: 'Mistral',
        iconUrl: 'mistral.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        displayName: 'OTHER4',
        modelId: 'HyperClovaX',
        provider: 'Naver',
        iconUrl: 'naver.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,

    },
    {
        displayName: 'OTHER5',
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
