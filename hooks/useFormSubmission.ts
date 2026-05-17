import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { sanitizeFormData } from '@/lib/sanitize';
import { submitToFormBold } from '@/lib/formbold';

export interface SubmitStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const FORM_SUBMISSION_FAILED_MESSAGE =
  'Form submission failed. Please try again later.';

const NETWORK_ERROR_MESSAGE =
  'Network error. Please check your connection and try again.';

interface UseFormSubmissionOptions<T extends object> {
  submitEndpoint: string;
  successMessage?: string;
  onSuccess?: (data: Record<string, unknown>) => void;
  buildPayload?: (data: T) => Record<string, unknown>;
}

export function useFormSubmission<T extends object>(
  initialData: T,
  options: UseFormSubmissionOptions<T>
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const payload = options.buildPayload
        ? options.buildPayload(formData)
        : formData;

      const sanitizedPayload = sanitizeFormData(payload);

      const result = await submitToFormBold(sanitizedPayload, {
        endpoint: options.submitEndpoint,
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message:
            options.successMessage ??
            'Thank you! Your submission has been received successfully.',
        });
        setFormData(initialData);
        options.onSuccess?.(sanitizedPayload);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error ?? FORM_SUBMISSION_FAILED_MESSAGE,
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: NETWORK_ERROR_MESSAGE,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
  };
}
