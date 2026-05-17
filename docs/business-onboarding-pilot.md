# Business onboarding pilot

## Context

The site's business listings are currently hardcoded in `lib/data/businesses.ts`. Before investing engineering time in a full backend, we want to validate that this product is useful to its target audience.

## How it works

1. A business owner fills out the form at `/add` — submission goes to **FormBold**.
2. **Riah** (`@Riri-M`) is notified via the org email and reviews the submission.
3. If the data is complete and valid, a dev (`@ifeadese` or `@Ini1234`) copies it into the hardcoded business list and redeploys.

## Why manual

This phase is about proving demand. If businesses are actually signing up and the directory is useful to people, we build the backend. If not, we haven't wasted the effort.

## When to automate

Once we're confident the product has traction, we can replace the manual copy step with a proper database and admin flow.
