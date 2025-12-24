'use client';

import React, { useState } from 'react';
import { ConfirmationResult } from 'firebase/auth';

interface PhoneVerificationProps {
    confirmationResult: ConfirmationResult;
    onVerified: () => void;
    onCancel: () => void;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
    confirmationResult,
    onVerified,
    onCancel,
}) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await confirmationResult.confirm(code);
            onVerified();
        } catch (err: any) {
            setError(err.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
                    <p className="text-gray-600">We've sent a 6-digit code to your phone number.</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label htmlFor="verification-code" className="block text-sm font-semibold text-gray-700 mb-2">
                            Verification Code
                        </label>
                        <input
                            id="verification-code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-center text-2xl font-bold tracking-widest placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                            placeholder="000000"
                            maxLength={6}
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || code.length !== 6}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Verifying...
                            </div>
                        ) : (
                            'Verify Code'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
