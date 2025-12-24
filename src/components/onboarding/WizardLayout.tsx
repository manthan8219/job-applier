'use client';

import React from 'react';
import { useOnboardingStore } from '@/lib/store/onboarding';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { clsx } from 'clsx'; // Simple conditional class helper we just installed if available, or template literals. 
// Actually I'll use template literals to be safe if clsx install fails or isn't picked up yet, but generic npm command usually works.
// I'll stick to template literals + tailwind-merge manually if needed, or just simple strings to rely on standard CSS.

interface WizardLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({ children, title, subtitle }) => {
    const { step, totalSteps, prevStep } = useOnboardingStore();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {step > 1 && step < 5 && (
                            <button
                                onClick={prevStep}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                                aria-label="Go back"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Job Profile Setup</h1>
                            <p className="text-xs text-gray-500">Step {step} of {totalSteps}</p>
                        </div>
                    </div>

                    {/* Progress Bar (Compact) */}
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex-1">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                        {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 animate-fadeIn">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};
