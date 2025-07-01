'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

export type Region = {
  name: string;
  flag: string;
  currency: string;
};

export const regions: Region[] = [
  { name: 'India', flag: '🇮🇳', currency: 'INR' },
  { name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { name: 'Europe', flag: '🇪🇺', currency: 'EUR' },
  { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { name: 'Japan', flag: '🇯🇵', currency: 'JPY' },
  { name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
  { name: 'Brazil', flag: '🇧🇷', currency: 'BRL' },
  { name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  { name: 'China', flag: '🇨🇳', currency: 'CNY' },
  { name: 'Mexico', flag: '🇲🇽', currency: 'MXN' },
  { name: 'Russia', flag: '🇷🇺', currency: 'RUB' },
  { name: 'Singapore', flag: '🇸🇬', currency: 'SGD' },
  { name: 'South Africa', flag: '🇿🇦', currency: 'ZAR' },
  { name: 'South Korea', flag: '🇰🇷', currency: 'KRW' },
  { name: 'Switzerland', flag: '🇨🇭', currency: 'CHF' },
];

type SettingsContextType = {
    keyshopsEnabled: boolean;
    setKeyshopsEnabled: (enabled: boolean) => void;
    selectedRegion: Region;
    setSelectedRegion: (region: Region) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [keyshopsEnabled, setKeyshopsEnabled] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

    return (
        <SettingsContext.Provider value={{ 
            keyshopsEnabled, 
            setKeyshopsEnabled,
            selectedRegion,
            setSelectedRegion
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
