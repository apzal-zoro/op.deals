'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

type SettingsContextType = {
    keyshopsEnabled: boolean;
    setKeyshopsEnabled: (enabled: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [keyshopsEnabled, setKeyshopsEnabled] = useState(true);

    return (
        <SettingsContext.Provider value={{ keyshopsEnabled, setKeyshopsEnabled }}>
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
