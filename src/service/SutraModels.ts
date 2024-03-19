export interface SutraModel {
    modelId: string;
    provider: string;
    maxTokens?: string;
    temperature?: number;
    iconUrl?: string;
}

export const SUTRA_MODELS: SutraModel[] = [
    { modelId: "SUTRA-50B-ONLINE", provider: "TWO.AI", iconUrl: "two.png" },
    { modelId: "SUTRA-9B-ONLINE", provider: "TWO.AI", iconUrl: "genie.png" },
];

export const OTHER_MODELS: SutraModel[] = [
    { modelId: "GPT4", provider: "OpenAI", iconUrl: "openai.png"},
    { modelId: "GPT3.5", provider: "OpenAI", iconUrl: "openai.png" },
    { modelId: "Mixtral13B", provider: "Mistral", iconUrl: "openai.png" },
    { modelId: "HyperClovaX", provider: "Naver", iconUrl: "openai.png" },
];
