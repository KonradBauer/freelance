# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server with Turbopack
npm run build      # production build
npm run start      # start production server
```

No linter or test runner configured.

### Docker

```bash
docker compose up --build   # build and run; app on port 7000
```

`NEXT_PUBLIC_*` vars are **build-time** — must be passed as `--build-arg` (see `docker-compose.yml`). Runtime secrets (`RESEND_*`) go in environment.

> Note: `Dockerfile` defaults to `PORT=3000`; `docker-compose.yml` maps `7000:7000`. If the container isn't reachable, add `PORT=7000` to the compose `environment` block.

## Architecture

Single-page Polish-language marketing site for a freelance web-dev service (studiocodeart.pl). One route (`/`) composed of 10 section components; one thank-you route (`/dziekujemy`).

### Key files

| File | Purpose |
|---|---|
| `src/lib/constants.ts` | All page content — copy, `PROCESS_STEPS`, `PORTFOLIO_ITEMS`, video paths |
| `src/lib/schemas.ts` | Zod `contactSchema` + `INDUSTRIES`/`BUDGETS` enums — shared by form and API |
| `src/lib/metadata.ts` | SEO/OG metadata; reads `NEXT_PUBLIC_SITE_URL` |
| `src/app/api/contact/route.ts` | Contact form POST — Resend email, in-memory rate limit (5 req/hr/IP), honeypot check |
| `src/components/ui/ContactForm.tsx` | Client component — react-hook-form + zod, redirects to `/dziekujemy` on success |
| `src/components/ui/FBPixel.tsx` | Facebook Pixel — fires on every page load |
| `src/components/ui/ThankYouPixelEvent.tsx` | Fires `Lead` Pixel event on `/dziekujemy` |

### Content changes

Edit `src/lib/constants.ts` to change portfolio items, process steps, or the video path. To add/remove industries or budgets, update the `as const` arrays in `src/lib/schemas.ts` — they drive both the select inputs and server-side validation.

### Environment variables

| Variable | Where | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build-time | Defaults to `https://studiocodeart.pl` |
| `NEXT_PUBLIC_FB_PIXEL_ID` | build-time | Facebook Pixel ID |
| `RESEND_API_KEY` | runtime | Resend API key |
| `RESEND_TO_EMAIL` | runtime | Recipient for lead emails |
| `RESEND_FROM_EMAIL` | runtime | Sender; defaults to `onboarding@resend.dev` (requires verified Resend domain) |

Copy `.env.local.example` → `.env.local` for local dev.

## Agents & Skills

Stored in `.claude/`. Skills are invoked with `/skill-name`; agents run as subagents inside skills.

### Dev workflow skills (use in order)

| Skill | When to use |
|---|---|
| `/dev-brainstorm` | Validate idea, produce requirements doc before any planning |
| `/dev-plan` | Technical planning → phased Implementation Units from requirements doc |
| `/dev-docs-execute` | Execute next phase/step of an active plan |
| `/dev-docs-review` | Multi-agent code review of a completed phase |
| `/dev-docs-update` | Update plan docs before context compaction |
| `/dev-docs-complete` | Archive finished task, extract learnings |
| `/dev-autopilot` | Full automated pipeline: execute→review→fix per phase |

Active plans live in `docs/active/`; requirements docs in `docs/dev-brainstorms/`; solutions/learnings in `docs/solutions/`.

### Other useful skills

| Skill | Purpose |
|---|---|
| `/bugfix` | Systematic bug fix with Sentry/E2E context |
| `/code-review` | PR review — React 19, Tailwind v4, Zod |
| `/code-quality` | Architecture/performance/simplicity audit |
| `/plan-review` | Multi-perspective plan review (VP Product/Eng/Design) |
| `/critical-think` | Skeptical auditor — challenges assumptions |
| `/dev-brainstorm` | Also resumes existing requirements docs |
| `/dev-ideate` | Multi-agent idea generation |
| `/ux-ui-guidelines` | UX/UI, accessibility, animations reference |
| `/tailwind-react-guidelines` | React 19 + Tailwind v4 patterns |
| `/zroastuj-mnie` | Stress-test a plan via interrogation |
| `/gemini` | Second-opinion analysis via Gemini CLI |

### Coding rules

`.claude/rules/coding-rules.md` — enforced conventions covering file size limits, testing, error handling, naming, type safety, async patterns, and a catalogue of 10 AI anti-patterns to avoid.
