'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';
import { GmailConnect } from '@/components/settings/GmailConnect';
import { JobPreferences } from '@/components/settings/JobPreferences';
import { ContactInfo } from '@/components/settings/ContactInfo';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) return null; // Or spinner
    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header (Simplified version of Dashboard header) */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                <SettingsIcon className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Integrations & Contact (Sticky-ish?) */}
                        <div className="lg:col-span-1 space-y-6">
                            <ContactInfo />
                            <GmailConnect />
                        </div>

                        {/* Right Column: Preferences (Wider) */}
                        <div className="lg:col-span-2 space-y-6">
                            <JobPreferences />

                            {/* Placeholder for future Automation Settings */}
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
                                <h3 className="text-lg font-bold mb-2">Automation Status</h3>
                                <p className="opacity-90 text-sm mb-4">
                                    Your job search agent is currently <strong>Inactive</strong>.
                                    Configure your preferences above to start the auto-applier.
                                </p>
                                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold backdrop-blur-sm transition-colors border border-white/10">
                                    Start Automation (Coming Soon)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
