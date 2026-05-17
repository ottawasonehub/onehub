# Business onboarding pilot

## Context

The site's business listings are currently hardcoded in `lib/data/businesses.ts`. Before investing engineering time in a full backend, we want to validate that this product is useful to its target audience.

## How it works

1. A business owner fills out the form at `/add` — submission goes to **FormBold**.
2. **Riah** (`@Riri-M`) is notified via the org email and reviews the submission.
3. If the data is complete and valid, a dev (`@ifeadese` or `@Ini1234`) copies it into the hardcoded business list and redeploys.

## Why manual

This phase is about proving demand. If businesses are actually signing up and the directory is useful to people, we build the backend. If not, we haven't wasted the effort.

## What success looks like for this phase

This pilot isn't just about the tech working — it's about proving that people actually want this.

A general "all businesses in Ottawa" directory is hard to compete with — Google Maps and Yelp already do that. But a curated list for a specific community (e.g., newcomer-friendly services, Black-owned businesses, student-focused spots) is something those platforms don't do well. That's where a project like this can stand out.

Before we build anything else, we want to see:
- Riah picks a focus — a community or niche she's personally connected to
- 20–30 real businesses listed through her own outreach
- The link shared in real Ottawa groups where her audience hangs out
- A few people actually using it to find a business

If that happens, we'll know it's worth building more. If it doesn't, we've saved ourselves months of work and can rethink the approach together.

The tech is ready. The next step is Riah's — and we're here to support however we can.

## When to automate

Once we're confident the product has traction, we can replace the manual copy step with a proper database and admin flow.
