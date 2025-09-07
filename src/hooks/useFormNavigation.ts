import { useState } from 'react';

export const useFormNavigation = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));

  const nextStep = () => {
    setCurrentStep(prev => {
      const next = Math.min(prev + 1, totalSteps - 1);
      setVisitedSteps(prevVisited => new Set(prevVisited).add(next));
      return next;
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    if (visitedSteps.has(step)) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    visitedSteps,
    nextStep,
    prevStep,
    goToStep,
    setCurrentStep,
  };
};