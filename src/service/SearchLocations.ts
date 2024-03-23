export interface SearchLocation {
    displayName: string;
    canonicalLocation: string;
    countryCode: string;
    languageCode: string;
}

export const SEARCH_LOCATIONS: SearchLocation[] = [
    { displayName: 'San Francisco', canonicalLocation: 'San Francisco,California,United States', countryCode: 'US', languageCode: 'en' },
    { displayName: 'Mumbai', canonicalLocation: 'Mumbai,Maharashtra,India', countryCode: 'IN', languageCode: 'hi' },
    { displayName: 'Seoul', canonicalLocation: 'Seoul,Seoul,South Korea', countryCode: 'KR', languageCode: 'ko' },

    { displayName: 'Beijing', canonicalLocation: 'Beijing,China', countryCode: 'CN', languageCode: 'zh' },
    { displayName: 'Cairo', canonicalLocation: 'Cairo,Cairo Governorate,Egypt', countryCode: 'EG', languageCode: 'ar' },
    { displayName: 'Cape Town', canonicalLocation: 'Cape Town,Western Cape,South Africa', countryCode: 'ZA', languageCode: 'af' },
    { displayName: 'London', canonicalLocation: 'Greater London,England,United Kingdom', countryCode: 'GB', languageCode: 'en' },
    { displayName: 'Nairobi', canonicalLocation: 'Nairobi,Nairobi County,Kenya', countryCode: 'KE', languageCode: 'sw' },
    { displayName: 'New Delhi', canonicalLocation: 'New Delhi,Delhi,India', countryCode: 'IN', languageCode: 'hi' },
    { displayName: 'New York', canonicalLocation: 'New York,New York,United States', countryCode: 'US', languageCode: 'en' },
    { displayName: 'Paris', canonicalLocation: 'Paris,Paris,Ile-de-France,France', countryCode: 'FR', languageCode: 'fr' },
    { displayName: 'Rio de Janeiro', canonicalLocation: 'Rio de Janeiro,State of Rio de Janeiro,Brazil', countryCode: 'BR', languageCode: 'pt' },
    { displayName: 'Sydney', canonicalLocation: 'Sydney CBD,New South Wales,Australia', countryCode: 'AU', languageCode: 'en' },
    { displayName: 'Tokyo', canonicalLocation: 'Tokyo,Japan', countryCode: 'JP', languageCode: 'ja' },
];
