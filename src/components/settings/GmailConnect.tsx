'use client';

import React, { useState } from 'react';
import { useSettingsStore } from '@/lib/store/settings';
import { Mail, Check, Eye, EyeOff, Key } from 'lucide-react';

export const GmailConnect = () => {
    const { settings, updateSettings } = useSettingsStore();
    const [showPassword, setShowPassword] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = async () => {
        setIsVerifying(true);
        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple mock validation (check if fields are not empty)
        if (settings.gmailEmail && settings.gmailAppPassword) {
            updateSettings({ isGmailConnected: true });
        }

        setIsVerifying(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-50 p-2 rounded-lg">
                    <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Gmail Integration</h2>
                    <p className="text-sm text-gray-500">Connect your account to send emails</p>
                </div>
                {settings.isGmailConnected && (
                    <span className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200">
                        <Check className="w-3.5 h-3.5" /> Connected
                    </span>
                )}
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Gmail Address</label>
                    <input
                        type="email"
                        value={settings.gmailEmail}
                        onChange={(e) => updateSettings({ gmailEmail: e.target.value, isGmailConnected: false })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm"
                        placeholder="youremail@gmail.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">App Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={settings.gmailAppPassword}
                            onChange={(e) => updateSettings({ gmailAppPassword: e.target.value, isGmailConnected: false })}
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm"
                            placeholder="xxxx xxxx xxxx xxxx"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Use an <strong>App Password</strong>, not your regular password.
                        <a href="https://myaccount.google.com/apppasswords" target="_blank" className="text-blue-600 hover:underline ml-1">
                            Create one here.
                        </a>
                    </p>
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleVerify}
                        disabled={isVerifying || !settings.gmailEmail || !settings.gmailAppPassword || settings.isGmailConnected}
                        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${settings.isGmailConnected
                                ? 'bg-gray-100 text-gray-400 cursor-default'
                                : 'bg-gray-900 text-white hover:bg-black hover:shadow-md'
                            }`}
                    >
                        {isVerifying ? 'Verifying...' : settings.isGmailConnected ? 'Verified' : 'Verify & Connect'}
                    </button>
                </div>
            </div>
        </div>
    );
};
