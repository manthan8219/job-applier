'use client';

import React from 'react';
import { useOnboardingStore } from '@/lib/store/onboarding';

export const StepPersonal = () => {
    const { data, updateData, nextStep } = useOnboardingStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => updateData({ fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        required
                        placeholder="John Doe"
                    />
                </div>

                {/* Job Title */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Current Job Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => updateData({ title: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        required
                        placeholder="Software Engineer"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        required
                        placeholder="you@example.com"
                    />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        required
                        placeholder="+1 555 000 0000"
                    />
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">LinkedIn URL</label>
                    <input
                        type="url"
                        value={data.linkedin}
                        onChange={(e) => updateData({ linkedin: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>

                {/* Portfolio */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Portfolio / Website</label>
                    <input
                        type="url"
                        value={data.portfolio}
                        onChange={(e) => updateData({ portfolio: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="https://yourwebsite.com"
                    />
                </div>
            </div>

            <div className="pt-6 flex justify-end">
                <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                >
                    Save & Continue
                </button>
            </div>
        </form>
    );
};
