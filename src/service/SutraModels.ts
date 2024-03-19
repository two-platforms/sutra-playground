import { MultilingualUserInput } from '@two-platforms/ion-multilingual-types';

export const DEFAULT_TEMPERATURE = 0.7;
export const DEFAULT_MAXTOKENS = 1024;

export interface SutraModel {
    modelId: string;
    provider: string;
    iconUrl: string;
    temperature: number;
    maxTokens: number;
}

export const SUTRA_MODELS: SutraModel[] = [
    {
        modelId: 'SUTRA-50B-ONLINE',
        provider: 'TWO.AI',
        iconUrl: 'two.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        modelId: 'SUTRA-9B-ONLINE',
        provider: 'TWO.AI',
        iconUrl: 'genie.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
];

export const OTHER_MODELS: SutraModel[] = [
    {
        modelId: 'GPT4',
        provider: 'OpenAI',
        iconUrl: 'openai.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        modelId: 'GPT3.5',
        provider: 'OpenAI',
        iconUrl: 'openai.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        modelId: 'Mixtral13B',
        provider: 'Mistral',
        iconUrl: 'mistral.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
    {
        modelId: 'HyperClovaX',
        provider: 'Naver',
        iconUrl: 'naver.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,

    },
    {
        modelId: 'Perplexity',
        provider: 'Perplexity',
        iconUrl: 'perplexity.png',
        temperature: DEFAULT_TEMPERATURE,
        maxTokens: DEFAULT_MAXTOKENS,
    },
];

export function buildCompletionRequest(prompt: string, model: SutraModel): MultilingualUserInput {
    const { modelId, temperature, maxTokens } = model;
    // @ts-expect-error - maxTokens will be number in ion-multilingual-types update
    return { prompt, modelId, temperature, maxTokens };
}
