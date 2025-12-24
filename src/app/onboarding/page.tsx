'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboardingStore } from '@/lib/store/onboarding';
import { WizardLayout } from '@/components/onboarding/WizardLayout';
import { StepUpload } from '@/components/onboarding/StepUpload';
import { StepPersonal } from '@/components/onboarding/StepPersonal';
import { StepExperience } from '@/components/onboarding/StepExperience';
import { StepComplete } from '@/components/onboarding/StepComplete';

export default function OnboardingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { step, totalSteps } = useOnboardingStore();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepUpload />;
            case 2:
                return <StepPersonal />;
            case 3:
                return <StepExperience />;
            case 4:
                // Wait, I planned 5 steps but implementation_plan had Review split. 
                // My store logic combined Review into Personal/Experience forms essentially.
                // Let's check store: totalSteps: 5.
                // Step 1: Upload
                // Step 2: Personal (Review/Edit mock data)
                // Step 3: Experience (Review/Edit mock data)
                // Step 4: [Missing? Maybe combine or Verification?] 
                // Step 5: Completion

                // I'll make Step 4 a "Summary Review" or just skip it if not needed?
                // User asked for "4-5 step onboarding".
                // Let's add a "Final Review" step or just map existing components.
                // Actually, let's make Step 4 a quick "Preferences" or just skip to completion if simplified.
                // I'll make Step 4 "Review" just showing a read-only view?
                // Or simply adjust totalSteps to 4 in store?
                // Store has `totalSteps: 5`.
                // Let's stick to the plan:
                // Step 4: Profile Review (Professional) -> which is StepExperience actually.
                // So:
                // 1: Upload
                // 2: Personal
                // 3: Experience
                // 4: Completion (Wait, plan said 5)

                // Plan said:
                // Step 3: Profile Review (Personal)
                // Step 4: Profile Review (Professional)
                // Step 5: Completion

                // So:
                // Step 1: Upload (Parsing happens here) -> Go to Step 2
                // Step 2: Form (Personal)
                // Step 3: Form (Experience)
                // Step 4: ... ? Maybe just make Experience step 3?
                // Let's check my components.
                // StepPersonal inputs personal data.
                // StepExperience inputs experience data.
                // That's 2 forms.
                // So 1(Upload) -> 2(Personal) -> 3(Experience) -> 4(Complete)?
                // If I want 5 steps, I can add a dedicated "Review" step at 4.
                // Let's do that: StepReview.

                return <StepReview />;
            case 5:
                return <StepComplete />;
            default:
                return <StepUpload />;
        }
    };

    // Titles for each step
    const titles = [
        { title: "Upload Resume", subtitle: "Let's start by scanning your resume" },
        { title: "Personal Details", subtitle: "Review and confirm your contact info" },
        { title: "Experience & Skills", subtitle: "Tell us about your professional background" },
        { title: "Final Review", subtitle: "Make sure everything looks correct" },
        { title: "All Set!", subtitle: "" }
    ];

    return (
        <WizardLayout
            title={titles[step - 1]?.title || ""}
            subtitle={titles[step - 1]?.subtitle}
        >
            {renderStep()}
        </WizardLayout>
    );
}

// Inline StepReview for simplicity or separate file?
// I'll separate it. It's better architecture.
function StepReview() {
    const { data, nextStep, setStep } = useOnboardingStore();

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2">Personal Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{data.fullName}</span></div>
                    <div><span className="text-gray-500">Email:</span> <span className="font-medium text-gray-900">{data.email}</span></div>
                    <div><span className="text-gray-500">Phone:</span> <span className="font-medium text-gray-900">{data.phone}</span></div>
                    <div><span className="text-gray-500">Title:</span> <span className="font-medium text-gray-900">{data.title}</span></div>
                    {data.resumeUrl && (
                        <div className="col-span-2">
                            <span className="text-gray-500">Resume: </span>
                            <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline break-all">
                                View Uploaded Resume
                            </a>
                        </div>
                    )}
                </div>
                <button onClick={() => setStep(2)} className="text-blue-600 text-sm font-semibold hover:underline">Edit</button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2">Experience & Skills</h3>
                <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Skills:</span> <span className="font-medium text-gray-900">{data.skills.join(', ')}</span></div>
                    <div className="space-y-2 mt-2">
                        <span className="text-gray-500">Work History:</span>
                        {data.experience.map((exp, i) => (
                            <div key={i} className="pl-3 border-l-2 border-gray-300">
                                <p className="font-medium text-gray-900">{exp.role} at {exp.company}</p>
                                <p className="text-xs text-gray-500">{exp.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => setStep(3)} className="text-blue-600 text-sm font-semibold hover:underline">Edit</button>
            </div>

            <div className="pt-6 flex justify-end">
                <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                >
                    Confirm & Finish
                </button>
            </div>
        </div>
    );
}
