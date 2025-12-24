'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/lib/store/onboarding';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const StepComplete = () => {
    const router = useRouter();
    const { data } = useOnboardingStore();

    const handleFinish = () => {
        router.push('/dashboard');
    };

    return (
        <div className="text-center py-12 animate-fadeIn flex flex-col items-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scaleIn">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                You are all set!
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                Great profile, {data.fullName.split(' ')[0]}! We've set up your dashboard and you're ready to start applying.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl w-full max-w-sm border border-slate-100 mb-10 text-left">
                <h4 className="font-semibold text-gray-900 mb-4">Profile Summary</h4>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="text-gray-900 font-medium">{data.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Role</span>
                        <span className="text-gray-900 font-medium">{data.title}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Skills</span>
                        <span className="text-gray-900 font-medium">{data.skills.length} added</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleFinish}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
            >
                <div className="flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
            </button>
        </div>
    );
};
