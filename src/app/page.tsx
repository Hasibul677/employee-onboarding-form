"use client";

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Progress } from '@/components/ui/progress';
import PersonalInfoStep from '@/components/steps/PersonalInfoStep';
import JobDetailsStep from '@/components/steps/JobDetailsStep';
import SkillsStep from '@/components/steps/SkillsStep';
import EmergencyContactStep from '@/components/steps/EmergencyContactStep';
import ReviewStep from '@/components/steps/ReviewStep';
import { formSchema } from '@/lib/validation';

export type FormData = z.infer<typeof formSchema>;

const steps = [
  'Personal Info',
  'Job Details',
  'Skills & Preferences',
  'Emergency Contact',
  'Review & Submit'
];

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      personalInfo: {
        profilePicture: null,
      },
      jobDetails: {
        jobType: 'Full-time',
      },
      skills: {
        primarySkills: [],
        remoteWorkPreference: 0,
      },
      emergencyContact: {
        relationship: '',
      },
    },
  });

const stepFields: (keyof FormData)[][] = [
  ['personalInfo'],
  ['jobDetails'],
  ['skills'],
  ['emergencyContact'],
  []
];

const nextStep = async () => {
  const fields = stepFields[currentStep];
  const isValid = await form.trigger(fields);
  if (isValid) {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  }
};

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const transformedData = transformFormData(data);
      console.log('Form submitted:', transformedData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <JobDetailsStep />;
      case 2:
        return <SkillsStep />;
      case 3:
        return <EmergencyContactStep />;
      case 4:
        return <ReviewStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Employee Onboarding</h1>
          <p className="text-gray-500 mt-2">
            Step <span className="font-medium text-gray-700">{currentStep + 1}</span> of {steps.length}:
            <span className="ml-1 text-blue-600 font-semibold">{steps[currentStep]}</span>
          </p>

          {/* Progress Bar */}
          <div className="mt-4">
            <Progress
              value={(currentStep + 1) / steps.length * 100}
              className="h-2 rounded-full bg-gray-200 [&>*]:bg-gradient-to-r [&>*]:from-blue-500 [&>*]:to-purple-500"
            />
          </div>
        </div>

        {/* Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
            {renderStep()}

            {/* Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-5 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:opacity-90 transition cursor-pointer"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : '✅ Submit'}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>

  );
}

function transformFormData(data: FormData) {
  return data;
}