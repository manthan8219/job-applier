import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsData {
    // Gmail Integration
    gmailEmail: string;
    gmailAppPassword: string; // Stored locally for now, should be encrypted in real app
    isGmailConnected: boolean;

    // Job Preferences
    searchFrequency: 'hourly' | 'daily' | 'weekly';
    testSearch: boolean; // Just a flag/demo
    locations: string[];
    jobKeywords: string[];

    // Contact Profile
    contactEmail: string;
    contactPhone: string;
}

interface SettingsState {
    settings: SettingsData;
    updateSettings: (updates: Partial<SettingsData>) => void;
    resetSettings: () => void;
}

const initialSettings: SettingsData = {
    gmailEmail: '',
    gmailAppPassword: '',
    isGmailConnected: false,
    searchFrequency: 'daily',
    testSearch: false,
    locations: [],
    jobKeywords: [],
    contactEmail: '',
    contactPhone: '',
};

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            settings: initialSettings,
            updateSettings: (updates) => set((state) => ({
                settings: { ...state.settings, ...updates }
            })),
            resetSettings: () => set({ settings: initialSettings }),
        }),
        {
            name: 'job-applier-settings',
        }
    )
);
