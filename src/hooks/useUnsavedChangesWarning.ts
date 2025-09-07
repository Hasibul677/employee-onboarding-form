import { useEffect } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export const useUnsavedChangesWarning = <TFormValues extends FieldValues>(
  form: UseFormReturn<TFormValues>,
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
