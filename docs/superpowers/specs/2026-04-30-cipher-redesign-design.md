# Cipher Dark — Visual Redesign Spec

**Date:** 2026-04-30
**Scope:** Full visual overhaul of the CompTIA Security+ SY0-701 study site. No JSX logic changes — pure CSS token replacement, typography upgrade, and component styling. All existing features remain intact.

---

## Goals

- Replace the current cream/beige light theme with a professional dark cybersecurity aesthetic
- Establish strong visual hierarchy so information doesn't feel compacted or overwhelming
- Use color purposefully: domain color-coding, accent hierarchy, status indicators
- Achieve a premium, crafted feel that looks production-ready

---

## Color System

```css
/* Base */
--bg:          #080E1A;   /* navy-black — page background */
--surface:     #0D1626;   /* card base */
--surface-2:   #131F35;   /* elevated surface, hover state */
--border:      rgba(56, 189, 248, 0.1);  /* cyan-tinted border */
--border-soft: rgba(255, 255, 255, 0.06); /* subtle dividers */

/* Accents */
--cyan:        #38BDF8;   /* primary accent — links, active, highlights */
--cyan-dim:    rgba(56, 189, 248, 0.12); /* cyan bg tint */
--gold:        #F59E0B;   /* secondary — exam focus, premium actions */
--gold-dim:    rgba(245, 158, 11, 0.12);
--emerald:     #10B981;   /* success, mastery, passed */
--emerald-dim: rgba(16, 185, 129, 0.12);
--rose:        #F43F5E;   /* hard difficulty, danger, incorrect */
--rose-dim:    rgba(244, 63, 94, 0.12);
--violet:      #8B5CF6;   /* D3 domain color */

/* Text */
--text:        #F1F5F9;   /* primary */
--text-muted:  #64748B;   /* secondary */
--text-dim:    #334155;   /* tertiary / placeholders */

/* Domain palette */
--d1: #38BDF8;  /* General Security — cyan */
--d2: #F43F5E;  /* Threats & Vulns — rose */
--d3: #8B5CF6;  /* Architecture — violet */
--d4: #10B981;  /* Security Ops — emerald */
--d5: #F59E0B;  /* Management — amber */

/* Utility */
--radius:      12px;
--radius-sm:   8px;
--radius-pill: 20px;
--transition:  0.18s ease;
--sidebar-width: 240px;
--font-heading: 'Syne', sans-serif;
--font-body:    'Inter', sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Page title (h1) | Syne | 800 | 2.25rem |
| Section heading (h2) | Syne | 700 | 1.75rem |
| Card title (h3) | Syne | 700 | 1.1rem |
| Body | Inter | 400 | 1rem |
| UI labels | Inter | 600 | 0.75rem uppercase |
| Eyebrow | Inter | 600 | 0.7rem uppercase, letter-spacing 0.1em |
| Mono / code | JetBrains Mono | 400 | 0.85rem |

Google Fonts import replaces Playfair Display + old Inter with:
`Syne:wght@400;600;700;800` + `Inter:wght@300;400;500;600;700` + `JetBrains+Mono:wght@400;500`

---

## Background Texture

Subtle dot-grid on `--bg` using CSS only — no image assets:
```css
background-image: radial-gradient(rgba(56,189,248,0.04) 1px, transparent 1px);
background-size: 28px 28px;
```
Applied to `body`. Gives depth without noise.

---

## Cards & Surfaces

- Background: `var(--surface)`
- Border: `1px solid var(--border)`
- Border-radius: `var(--radius)` (12px)
- Top accent bar: `3px solid var(--domain-color)` — set via `--domain-color` CSS custom property
- Hover: `translateY(-2px)` + `box-shadow: 0 0 28px var(--domain-color, var(--cyan)) / 15%`
- No heavy drop shadows — depth from border contrast alone

---

## Sidebar

- Width: 240px, background: `var(--bg)`, right border: `1px solid var(--border-soft)`
- Logo: Syne 700, cyan accent on "Security+"
- Progress bar: gradient `var(--cyan)` → `var(--emerald)`
- Nav links:
  - Default: `rgba(255,255,255,0.55)` text, transparent bg
  - Hover: `rgba(255,255,255,0.85)` text, `var(--surface)` bg
  - Active: `var(--cyan)` text, `var(--cyan-dim)` bg, `2px solid var(--cyan)` left border
- Domain dots: colored circle `8px` with `box-shadow: 0 0 6px color`
- SVG icons: 16×16, `currentColor` (already implemented)

---

## Progress & Stats

- All progress bar tracks: `rgba(255,255,255,0.07)` background
- All progress fills: `linear-gradient(90deg, var(--cyan), var(--emerald))`
- Ring/circle progress: cyan stroke on dark track
- Stat numbers: Syne 700, colored (cyan for primary, gold for mastery)

---

## Buttons

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary (btn-gold) | `var(--gold)` | `#000` | none |
| Outline (btn-outline) | transparent | `var(--text)` | `var(--border-soft)` |
| Cyan | `var(--cyan)` | `#000` | none |
| Destructive | transparent | `var(--rose)` | `var(--rose-dim)` |

All buttons: `border-radius: var(--radius-sm)`, `font-family: var(--font-body)`, `font-weight: 600`

---

## Lab-Specific

- Artifact/terminal blocks: `background: #050A14`, JetBrains Mono, `color: #94A3B8`
- Correct state: `var(--emerald)` border + `var(--emerald-dim)` background
- Incorrect state: `var(--rose)` border + `var(--rose-dim)` background
- Selected state: `var(--cyan)` border + `var(--cyan-dim)` background
- Score banners: matching color scheme

---

## Callouts / Info Blocks

Replace existing callout styles:
- `callout-key`: cyan border-left, `var(--cyan-dim)` background
- `callout-warn`: gold border-left, `var(--gold-dim)` background
- `callout-tip`: emerald border-left, `var(--emerald-dim)` background

---

## Difficulty & Status Badges

- Easy: emerald bg-dim, emerald text
- Medium: gold bg-dim, gold text
- Hard: rose bg-dim, rose text
- Exam Focus: gold bg-dim, gold text, ★ prefix
- New: `var(--surface-2)` bg, muted text
- In Progress: gold bg-dim, gold text
- Passed: emerald bg-dim, emerald text

---

## File Changes

| File | Action |
|------|--------|
| `index.html` | Replace Google Fonts import (Playfair+old Inter → Syne+Inter+JetBrains Mono) |
| `src/styles/globals.css` | Full replacement — new tokens, typography, base resets, dot-grid texture |
| `src/styles/components.css` | Full replacement — all component styles updated to Cipher tokens |

No JSX files are modified. All visual changes live in CSS.

---

## Out of Scope

- Layout changes (sidebar width stays 240px, grid structure unchanged)
- Feature changes (no new components or routes)
- Animation system (existing Framer Motion transitions stay as-is)
- Responsive breakpoints (existing breakpoints unchanged)
