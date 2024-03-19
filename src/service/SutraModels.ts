export interface SutraModel {
    modelId: string;
    provider: string;
    maxTokens?: string;
    temperature?: number;
}

export const SUTRA_MODELS: SutraModel[] = [
    { modelId: "sutra-50B-online", provider: "Sutra" },
    { modelId: "sutra-9B-online", provider: "Sutra" },
];

export const OTHER_MODELS: SutraModel[] = [
    { modelId: "GPT4", provider: "OpenAI" },
    { modelId: "GPT3.5", provider: "OpenAI" },
];
