'use client';

import React, { useState } from 'react';
import { useSettingsStore } from '@/lib/store/settings';
import { Search, MapPin, Briefcase, X, Clock } from 'lucide-react';

export const JobPreferences = () => {
    const { settings, updateSettings } = useSettingsStore();
    const [locInput, setLocInput] = useState('');
    const [roleInput, setRoleInput] = useState('');

    const addLocation = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && locInput.trim()) {
            e.preventDefault();
            if (!settings.locations.includes(locInput.trim())) {
                updateSettings({ locations: [...settings.locations, locInput.trim()] });
            }
            setLocInput('');
        }
    };

    const removeLocation = (loc: string) => {
        updateSettings({ locations: settings.locations.filter(l => l !== loc) });
    };

    const addRole = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && roleInput.trim()) {
            e.preventDefault();
            if (!settings.jobKeywords.includes(roleInput.trim())) {
                updateSettings({ jobKeywords: [...settings.jobKeywords, roleInput.trim()] });
            }
            setRoleInput('');
        }
    };

    const removeRole = (role: string) => {
        updateSettings({ jobKeywords: settings.jobKeywords.filter(r => r !== role) });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-50 p-2 rounded-lg">
                    <Search className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Job Preferences</h2>
                    <p className="text-sm text-gray-500">Configure your automated search</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Frequency */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" /> Search Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {(['hourly', 'daily', 'weekly'] as const).map((freq) => (
                            <button
                                key={freq}
                                onClick={() => updateSettings({ searchFrequency: freq })}
                                className={`py-2 px-3 rounded-xl text-sm font-medium border capitalize transition-all ${settings.searchFrequency === freq
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {freq}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Locations */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" /> Target Locations
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={locInput}
                            onChange={(e) => setLocInput(e.target.value)}
                            onKeyDown={addLocation}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-sm"
                            placeholder="Type location & press Enter (e.g. Remote, NY)"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {settings.locations.map((loc) => (
                            <span key={loc} className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100 animate-scaleIn">
                                {loc}
                                <button onClick={() => removeLocation(loc)} className="hover:text-blue-900"><X className="w-3 h-3" /></button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Roles/Keywords */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" /> Job Titles & Keywords
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value)}
                            onKeyDown={addRole}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-sm"
                            placeholder="Type keyword & press Enter (e.g. React, Manager)"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {settings.jobKeywords.map((role) => (
                            <span key={role} className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100 animate-scaleIn">
                                {role}
                                <button onClick={() => removeRole(role)} className="hover:text-purple-900"><X className="w-3 h-3" /></button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
