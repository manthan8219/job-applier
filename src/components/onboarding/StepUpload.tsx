'use client';

import React, { useCallback, useState } from 'react';
import { useOnboardingStore } from '@/lib/store/onboarding';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

export const StepUpload = () => {
    const { setResumeFile, startScanning, isScanning, scanProgress } = useOnboardingStore();
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                handleFileSelect(file);
            } else {
                alert('Please upload a PDF file.');
            }
        }
    }, []);

    const handleFileSelect = (file: File) => {
        setResumeFile(file);
        startScanning();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    if (isScanning) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
                    <FileText className="w-10 h-10 text-blue-600 animate-pulse" />
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-spin-slow" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing your resume...</h3>
                <p className="text-gray-500 mb-8 max-w-sm">We're extracting your profile details to speed up your setup.</p>

                {/* Progress Bar */}
                <div className="w-full max-w-md bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out"
                        style={{ width: `${scanProgress}%` }}
                    />
                </div>
                <p className="text-sm font-semibold text-blue-600 mt-3">{scanProgress}% Complete</p>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn">
            <div
                className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ease-in-out cursor-pointer ${isDragActive
                    ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                    : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('resume-upload')?.click()}
            >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-blue-600' : 'text-blue-500'}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {isDragActive ? 'Drop your resume here' : 'Grid your resume'}
                </h3>
                <p className="text-gray-500 mb-8">
                    Drag & drop your PDF resume here, or click to browse.
                    <br />
                    <span className="text-sm">Supported formats: PDF (Max 5MB)</span>
                </p>

                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                    Select Resume PDF
                </button>

                <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => handleFileSelect(new File(["dummy"], "sample-resume.pdf", { type: "application/pdf" }))}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                >
                    Use sample resume (Demo)
                </button>
            </div>

            <div className="mt-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p>We'll auto-fill your profile details from your resume so you don't have to type them manually.</p>
                </div>
            </div>
        </div>
    );
};
