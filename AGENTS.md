<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guidelines & Agent Workflows (bookuj.pl)

These guidelines apply project-wide across all Antigravity pairs and subagents working in the `bookuj` repository.

## 1. Notion MCP Guidelines
- **Project Database ID:** `3fd09c9f-c86e-816b-924e-d48547c279a9` (All tasks, specs, and roadmap tracking reside here).
- **Task Search:** Use `API-post-search` with specific query keywords rather than broad unstructured queries.
- **Task Progress Notes:** NEVER use `API-create-a-comment` (Notion integration tokens lack comment permissions and return `403 restricted_resource`). Always use `API-patch-block-children` on the task's page ID to append progress notes, implementation logs, and verification summaries.
- **Task Status Updates:** Use `API-patch-page` to transition task status (`To Do` -> `In Progress` -> `Done`).

## 2. Command Execution & Environment
- **Node & npm Binaries:** Node is located at `/Users/jan/.local/bin/node`. When running builds, scripts, or package operations, ensure PATH is exported:
  ```bash
  export PATH="/Users/jan/.local/bin:$PATH" && npm run build
  ```
- **Build Verification:** Always run `npm run build` locally to verify 0 TypeScript/Turbopack errors before marking any task as complete or requesting user signoff.
- **Git Operations:** Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`) with descriptive titles.

## 3. Architecture & Routing Standards
- **Dedicated Property URLs Only:** The root path (`/`) is strictly an informational "Nie określono obiektu" error page. Individual property listings MUST live on dedicated paths: `/[slug]` (e.g., `/zakopane-gorna-chata`).
- **Supabase-First Data Layer:**
  - Real listing data resides in Supabase table `public.properties`.
  - Next.js fetches via `src/lib/propertyData.ts` with ISR `export const revalidate = 60` on `[slug]/page.tsx`.
  - `src/data/default-properties.json` is strictly an offline fallback used only when the Supabase connection is unreachable.
  - Archetypal showcase properties for seeding are preserved in `supabase/seed-data.json`.
- **Bilingual English/Local Language Architecture:**
  - All property fields must support English by default with local language translations (`translations[locale]`).
  - The local language is specified per property (`defaultLocale`, e.g., `'pl'`, `'no'`, `'it'`).
  - By default, the website displays content in the property's local language so local guests and domestic travelers are fully served, with an instant toggle for English (`en`).

## 4. Implementation Cadence
- **One Task at a Time:** Never bundle multiple roadmap steps into a single pass. Implement one discrete task, test it, verify it against live requirements, and then update Notion before advancing to the next step.
