# TAKE SOME TIME TO LIVE Interactive Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a responsive, single-stage retro Flash-inspired portfolio for works, Bilibili Vlogs, about content, and contact links.

**Architecture:** A client-side React stage owns the active panel and transition state. Content is read from a typed local configuration, while CSS and one coordinated animation timeline provide suspended-object motion and responsive layout without a backend.

**Tech Stack:** React 19, TypeScript, Vinext/Vite, GSAP, CSS, Node test runner

---

### Task 1: Define content and stage contracts

**Files:**
- Create: `app/content.ts`
- Create: `app/types.ts`
- Test: `tests/content-config.test.mjs`

1. Add typed entries for WORKS, VLOG, ABOUT US, and CONTACT.
2. Add realistic placeholder content and Bilibili identifiers.
3. Test that every menu item maps to a content panel and has required labels.
4. Run `pnpm test` after the product UI exists.

### Task 2: Build the suspended stage

**Files:**
- Modify: `app/page.tsx`
- Create: `app/InteractiveStage.tsx`
- Modify: `app/globals.css`

1. Replace the starter skeleton with the branded launch screen.
2. Add the Logo plaque, cloud layers, center character, suspended navigation objects, and footer signature.
3. Implement semantic buttons and keyboard-accessible panel selection.
4. Verify the no-JavaScript/server-rendered shell still contains the brand and section names.

### Task 3: Implement transitions and panels

**Files:**
- Modify: `app/InteractiveStage.tsx`
- Modify: `app/globals.css`

1. Add launch, menu entrance, hover sway, panel entrance, panel exit, and return-to-menu timelines.
2. Add WORKS gallery navigation and VLOG selection/player reveal.
3. Add ABOUT US and CONTACT cards with graceful missing-content states.
4. Prevent overlapping transitions during rapid input and preserve focus after state changes.

### Task 4: Add responsive and reduced-motion behavior

**Files:**
- Modify: `app/globals.css`
- Modify: `app/InteractiveStage.tsx`

1. Reflow the fixed desktop stage into a vertical mobile hanging layout.
2. Reduce secondary ambience on small screens while preserving core transitions.
3. Respect `prefers-reduced-motion` and keep content operable without sweeping movement.
4. Validate touch target size, contrast, overflow, and iframe sizing.

### Task 5: Remove starter metadata and validate

**Files:**
- Modify: `app/layout.tsx`
- Delete: `app/_sites-preview/SkeletonPreview.tsx`
- Delete: `app/_sites-preview/preview.css`
- Modify: `package.json`
- Test: `tests/rendered-html.test.mjs`

1. Set Chinese language metadata, title, and description.
2. Remove the starter skeleton dependency and metadata marker.
3. Build with `pnpm build`; fix compilation or rendering failures.
4. Run the rendered HTML test and inspect the local preview.

