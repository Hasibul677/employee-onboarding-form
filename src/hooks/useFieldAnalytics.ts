// hooks/useFieldAnalytics.ts
import { useEffect, useRef } from 'react';

export const useFieldAnalytics = (fieldName: string) => {
  const startTimeRef = useRef<number | null>(null);
  const totalTimeRef = useRef(0);

  useEffect(() => {
    // Start timer when field is focused
    const handleFocus = () => {
      startTimeRef.current = Date.now();
    };

    // Stop timer when field is blurred and record time
    const handleBlur = () => {
      if (startTimeRef.current) {
        const endTime = Date.now();
        const timeSpent = endTime - startTimeRef.current;
        totalTimeRef.current += timeSpent;
        startTimeRef.current = null;
        
        // Here you could send this data to an analytics service
        console.log(`Time spent on ${fieldName}: ${timeSpent}ms (total: ${totalTimeRef.current}ms)`);
      }
    };

    const element = document.querySelector(`[name="${fieldName}"]`);
    if (element) {
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
    }

    return () => {
      if (element) {
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('blur', handleBlur);
      }
    };
  }, [fieldName]);

  return {
    getTotalTime: () => totalTimeRef.current,
  };
};