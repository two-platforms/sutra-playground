export interface SutraModel {
    modelId: string;
    maxTokens?: string;
    temperature?: number;
};

export const SUTRA_MODELS: SutraModel[] = [
    { modelId: 'sutra-50B-online' },
    { modelId: 'sutra-9B-online' },
];

export const OTHER_MODELS: SutraModel[] = [
    { modelId: 'GPT4' },
    { modelId: 'GPT3.5' },
];