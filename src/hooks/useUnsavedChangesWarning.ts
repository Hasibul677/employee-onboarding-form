// hooks/useUnsavedChangesWarning.ts
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const useUnsavedChangesWarning = (
  form: UseFormReturn<any>,
  isEnabled: boolean = true
) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.formState.isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form.formState.isDirty, isEnabled]);
};