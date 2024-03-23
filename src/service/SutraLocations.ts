import { K } from '../utils/K';

export interface SutraLocation {
    serviceURL: string;
    displayName: string;
    uule: string;
}

export const SUTRA_LOCATIONS: SutraLocation[] = [
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Mumbai', uule: 'Mumbai,Maharashtra,India' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'New Delhi', uule: 'New Delhi,Delhi,India' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'San Francisco', uule: 'San Francisco Bay Area,United States' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'New York', uule: 'New York,New York,United States' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Paris', uule: 'Paris,Paris,Ile-de-France,France' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Greater London', uule: 'Greater London,England,United Kingdom' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Seoul', uule: 'Seoul,South Korea' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Beijing', uule: 'Beijing,China' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Tokyo', uule: 'Tokyo,Japan' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Sydney', uule: 'Sydney CBD,New South Wales,Australia' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Rio de Janeiro', uule: 'Rio de Janeiro,Brazil' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Cape Town', uule: 'Cape Town,Western Cape,South Africa' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Nairobi', uule: 'Nairobi,Nairobi County,Kenya' },
    { serviceURL: K.SUTRA_SERVICE_US, displayName: 'Cairo', uule: 'Cairo,Egypt' },
];
