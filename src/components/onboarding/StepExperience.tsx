'use client';

import React from 'react';
import { useOnboardingStore, OnboardingData } from '@/lib/store/onboarding';
import { Plus, Trash2 } from 'lucide-react';

export const StepExperience = () => {
    const { data, updateData, nextStep } = useOnboardingStore();

    const handleAddExperience = () => {
        updateData({
            experience: [
                ...data.experience,
                { company: '', role: '', duration: '' }
            ]
        });
    };

    const handleUpdateExperience = (index: number, field: keyof OnboardingData['experience'][0], value: string) => {
        const newExperience = [...data.experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        updateData({ experience: newExperience });
    };

    const handleRemoveExperience = (index: number) => {
        const newExperience = data.experience.filter((_, i) => i !== index);
        updateData({ experience: newExperience });
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { // Changed to TextArea for MVP comma separation
        const skillsString = e.target.value;
        // We store it as array in state, but here we can just update it roughly or keep as string in local state? 
        // Actually store expects string array. Let's just convert on blur or keep simple text input for now.
        // Better: Simple text area that converts to array on change
        updateData({ skills: skillsString.split(',').map(s => s.trim()) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">

            {/* Work Experience Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Work Experience</h3>
                    <button
                        type="button"
                        onClick={handleAddExperience}
                        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                        <Plus className="w-4 h-4" /> Add Position
                    </button>
                </div>

                <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group transition-all hover:border-blue-200 hover:shadow-md">
                            <button
                                type="button"
                                onClick={() => handleRemoveExperience(index)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                title="Remove"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase">Company</label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => handleUpdateExperience(index, 'company', e.target.value)}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Company Name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase">Role</label>
                                    <input
                                        type="text"
                                        value={exp.role}
                                        onChange={(e) => handleUpdateExperience(index, 'role', e.target.value)}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Job Title"
                                        required
                                    />
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase">Duration</label>
                                    <input
                                        type="text"
                                        value={exp.duration}
                                        onChange={(e) => handleUpdateExperience(index, 'duration', e.target.value)}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. Jan 2020 - Present"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {data.experience.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                            No work experience added yet.
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Education Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Education</h3>
                <input
                    type="text"
                    value={data.education}
                    onChange={(e) => updateData({ education: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="University, Degree, Graduation Year"
                />
            </div>

            <hr className="border-gray-100" />

            {/* Skills Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Skills</h3>
                <p className="text-sm text-gray-500">Separate skills with commas</p>
                <textarea
                    value={data.skills.join(', ')}
                    onChange={handleSkillsChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all min-h-[100px]"
                    placeholder="React, TypeScript, Node.js, Project Management..."
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.skills.filter(s => s).map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="pt-6 flex justify-end">
                <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                >
                    Complete Setup
                </button>
            </div>
        </form>
    );
};
