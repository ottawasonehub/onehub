# Task: Wire `/add` Form to FormBold

## Context
The `/add` page currently POSTs to a local `/api/businesses` endpoint (in-memory store). We want it to submit directly to FormBold (`https://formbold.com/s/3GLXp`) via JSON POST, following the same sanitize → submit-lib → hook architecture used in the galentinesglobal.com reference project (adapted from Formspree to FormBold).

## Implementation Steps

### 1. Create `lib/sanitize.ts`
Direct port from galentines — strip HTML tags, trim, cap at 1000 chars for strings; pass-through for non-strings.

### 2. Create `lib/formbold.ts`
- Export `DEFAULT_FORMBOLD_SUBMIT_URL = 'https://formbold.com/s/3GLXp'`
- Export `submitToFormBold(data, { endpoint })` — POST JSON, handle JSON and non-JSON responses (FormBold may return HTML on success), return `{ success, error? }`
- Simpler than the Formspree version: treat `response.ok` as success regardless of response body format

### 3. Create `hooks/useFormSubmission.ts`
Same shape as galentines hook, adapted:
- Generic over form data type `T`
- Accepts `submitEndpoint` option (not `formspreeEndpoint`)
- Calls `sanitizeFormData` → `submitToFormBold`
- Manages `formData`, `isSubmitting`, `submitStatus`, `handleChange`, `handleSubmit`
- On success: reset form, call optional `onSuccess` callback
- On error: show error message

### 4. Add `formBoldFieldNames` to `content/en/add.ts`
Maps internal form field keys to FormBold dashboard field names:
```ts
formBoldFieldNames: {
  name: 'business_name',
  category: 'category',
  phone: 'phone',
  description: 'description',
  address: 'address',
  email: 'email',
  website: 'website',
}
```
This lets field names be adjusted to match FormBold dashboard keys without editing JSX.

### 5. Refactor `app/add/page.tsx`
- Remove local state management (`useState` for formData, isSubmitting, error)
- Remove the `handleChange` and `handleSubmit` inline implementations
- Remove the fetch to `/api/businesses`
- Import and use `useFormSubmission` hook with endpoint:
  ```ts
  process.env.NEXT_PUBLIC_FORMBOLD_FORM_URL?.trim() || DEFAULT_FORMBOLD_SUBMIT_URL
  ```
- Before submitting, remap form keys using `formBoldFieldNames` from content
- Keep all existing UI/fields/styling/success screen exactly as-is
- Keep the `useRouter` redirect-on-success behavior

### 6. Verify
- `npm run build` passes
- Check for lint/type errors in changed files

## Files Changed
| File | Action |
|------|--------|
| `lib/sanitize.ts` | Create |
| `lib/formbold.ts` | Create |
| `hooks/useFormSubmission.ts` | Create |
| `content/en/add.ts` | Edit (add `formBoldFieldNames`) |
| `app/add/page.tsx` | Edit (use hook, remove local API call) |

## Not Touched
- `/api/businesses/route.ts` — left in place (other pages may use it)
- Any contact form
- No new env files created (env var is optional, falls back to hardcoded URL)

## Reference Implementation
- Repo: `https://github.com/ifeadese/galentinesglobal.com`
- `lib/formspree.ts` — submission lib pattern
- `hooks/useFormSubmission.ts` — hook pattern
- `lib/sanitize.ts` — sanitization pattern
