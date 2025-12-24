import { create } from 'zustand';
import { uploadResumeAction } from '@/app/actions/upload';

export interface OnboardingData {
    // Personal
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;

    // Professional
    title: string;
    skills: string[];
    experience: {
        company: string;
        role: string;
        duration: string;
    }[];
    education: string;
    resumeUrl: string | null;
}

interface OnboardingState {
    step: number;
    totalSteps: number;
    resumeFile: File | null;
    data: OnboardingData;
    isScanning: boolean;
    scanProgress: number;

    // Actions
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    setResumeFile: (file: File) => void;
    updateData: (data: Partial<OnboardingData>) => void;
    startScanning: () => Promise<void>;
    reset: () => void;
}

const initialData: OnboardingData = {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    title: '',
    skills: [],
    experience: [],
    education: '',
    resumeUrl: null,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
    step: 1,
    totalSteps: 5,
    resumeFile: null,
    data: initialData,
    isScanning: false,
    scanProgress: 0,

    setStep: (step) => set({ step }),

    nextStep: () => {
        const { step, totalSteps } = get();
        if (step < totalSteps) set({ step: step + 1 });
    },

    prevStep: () => {
        const { step } = get();
        if (step > 1) set({ step: step - 1 });
    },

    setResumeFile: (file) => set({ resumeFile: file }),

    updateData: (updates) => set((state) => ({
        data: { ...state.data, ...updates }
    })),

    startScanning: async () => {
        const { resumeFile } = get();
        if (!resumeFile) return;

        set({ isScanning: true, scanProgress: 0 });

        // Create FormData for upload
        const formData = new FormData();
        formData.append('file', resumeFile);

        // Start Upload and Simulation in parallel
        const uploadPromise = uploadResumeAction(formData);

        const simulationPromise = (async () => {
            const steps = [10, 30, 50, 75, 90];
            for (const progress of steps) {
                await new Promise(resolve => setTimeout(resolve, 600)); // Slightly slower to allow upload time
                set({ scanProgress: progress });
            }
        })();

        try {
            // Wait for both to likely finish (at least upload must finish)
            const [uploadResult] = await Promise.all([uploadPromise, simulationPromise]);

            set({ scanProgress: 100 });

            if (uploadResult.success && uploadResult.url) {
                console.log("Resume uploaded:", uploadResult.url);
                set((state) => ({
                    data: { ...state.data, resumeUrl: uploadResult.url }
                }));
            } else {
                console.error("Upload failed:", uploadResult.error);
                // We don't block the flow for now, but in real app we should show error
            }

            // "Extract" dummy data
            const mockData: Partial<OnboardingData> = {
                fullName: 'Alex Morgan',
                email: 'alex.morgan@example.com',
                phone: '+1 (555) 012-3456',
                linkedin: 'linkedin.com/in/alexmorgan',
                title: 'Senior Frontend Developer',
                skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
                experience: [
                    {
                        company: 'Tech Solutions Inc.',
                        role: 'Frontend Developer',
                        duration: '2021 - Present',
                    },
                    {
                        company: 'WebCraft Agency',
                        role: 'Junior Web Developer',
                        duration: '2019 - 2021',
                    }
                ],
                education: 'B.S. Computer Science, University of Technology',
            };

            set((state) => ({
                isScanning: false,
                data: { ...state.data, ...mockData },
            }));

            setTimeout(() => {
                get().nextStep();
            }, 500);

        } catch (error) {
            console.error("Scanning process failed:", error);
            set({ isScanning: false });
        }
    },

    reset: () => set({
        step: 1,
        resumeFile: null,
        data: initialData,
        isScanning: false,
        scanProgress: 0
    }),
}));
