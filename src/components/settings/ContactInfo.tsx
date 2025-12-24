'use client';

import React from 'react';
import { useSettingsStore } from '@/lib/store/settings';
import { User, Phone, FileText } from 'lucide-react';

export const ContactInfo = () => {
    const { settings, updateSettings } = useSettingsStore();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-50 p-2 rounded-lg">
                    <User className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Application Profile</h2>
                    <p className="text-sm text-gray-500">Contact details sent with applications</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Contact Email</label>
                    <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm"
                        placeholder="Application email"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            value={settings.contactPhone}
                            onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg border border-gray-200">
                                <FileText className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Primary Resume</p>
                                {/* In real app, check upload store or settings store for resume name */}
                                <p className="text-xs text-gray-500">Managed in Onboarding/Profile</p>
                            </div>
                        </div>
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
