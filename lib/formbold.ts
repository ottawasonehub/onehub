export const DEFAULT_FORMBOLD_SUBMIT_URL = 'https://formbold.com/s/3GLXp';

export interface SubmitToFormBoldResult {
  success: boolean;
  error?: string;
}

interface SubmitToFormBoldOptions {
  endpoint: string;
}

async function readResponseMessage(response: Response): Promise<string | null> {
  const contentType = response.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/json')) {
      const data = (await response.json()) as {
        error?: string;
        message?: string;
        errors?: Array<{ message?: string }>;
      };

      return data.error ?? data.message ?? data.errors?.[0]?.message ?? null;
    }

    const text = await response.text();
    return text.trim() ? text.trim().slice(0, 200) : null;
  } catch {
    return null;
  }
}

export async function submitToFormBold(
  data: Record<string, unknown>,
  options: SubmitToFormBoldOptions
): Promise<SubmitToFormBoldResult> {
  const endpoint = options.endpoint.trim();

  if (!endpoint) {
    return {
      success: false,
      error: 'Form submission endpoint is not configured.',
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    }

    const message = await readResponseMessage(response);

    return {
      success: false,
      error: message ?? `Form submission failed (${response.status}).`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
