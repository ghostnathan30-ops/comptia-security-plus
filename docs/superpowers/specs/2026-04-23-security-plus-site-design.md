# CompTIA Security+ Study Website — Design Spec

**Date:** 2026-04-23  
**Exam Target:** CompTIA Security+ SY0-701

---

## Context

A personal, luxurious study website to master all content required to pass the CompTIA Security+ SY0-701 exam with the best possible score. The site must contain every domain, objective, term, concept, and practice mechanism needed — functioning as a complete, self-contained study system. No backend, no auth, no external dependencies beyond fonts and icons.

---

## Design System

| Token | Value |
|---|---|
| Background | `#FDFCF8` |
| Card surface | `#FFFFFF` |
| Primary text | `#1E1E2A` |
| Gold accent | `#9B7B4C` |
| Border / divider | `#EAE6DF` |
| Heading font | Playfair Display (Google Fonts) |
| Body font | Inter (Google Fonts) |
| Card radius | 20px |
| Card border | `1px solid #EAE6DF` or `box-shadow: 0 2px 16px rgba(155,123,76,0.07)` |
| Button style | Gold fill `#9B7B4C` or outlined gold |
| No | neon, frosted glass, RGB glows |
| Layout | Spacious, calm, generous padding (40px+ sections) |

---

## Tech Stack

- **React 18 + Vite** — fast HMR, component-driven, handles interactive features
- **React Router v6** — client-side routing between pages
- **Framer Motion** — smooth page transitions and micro-animations
- **Custom CSS (CSS Variables)** — design system tokens, no Tailwind (keeps bundle lean)
- **localStorage** — mastery/progress persistence across sessions
- No backend, no database, no auth

---

## Information Architecture

```
/ (Dashboard)
/domains                    → All 5 domains overview
/domains/:domainId          → Domain detail with all objectives
/domains/:domainId/:topicId → Topic deep-dive with full notes
/flashcards                 → Flashcard deck (filter by domain)
/quiz                       → Practice exam (filter by domain, timed/untimed)
/glossary                   → Full acronym + term glossary (A–Z)
/exam-tips                  → Test-taking strategy & exam day guide
```

---

## Pages

### 1. Dashboard (`/`)
- Global progress ring: % mastered across all domains
- 5 domain cards with individual mastery bars (color-coded)
- Study streak counter (localStorage)
- Quick-action buttons: "Continue Studying", "Practice Quiz", "Review Flashcards"
- Encouraging header with Playfair Display headline

### 2. Domains Overview (`/domains`)
- Grid of 5 domain cards, each showing:
  - Domain number, name, exam weight %
  - Mastery progress bar (gold fill)
  - Topic count
  - "Study" CTA button

### 3. Domain Detail (`/domains/:domainId`)
- Domain header: number, name, weight, description
- Accordion list of all objectives under the domain
- Each objective shows: title, status badge (Not Started / In Progress / Mastered), subtopic count
- "Mark as Mastered" toggle per objective

### 4. Topic Deep-Dive (`/domains/:domainId/:topicId`)
- Full study notes (comprehensive, exam-focused)
- Key points callout boxes
- Memory tips / mnemonics
- Related acronyms inline
- "Mark Mastered" button
- Next/Prev topic navigation

### 5. Flashcards (`/flashcards`)
- Full deck: ~300 cards covering all domains
- Flip animation (Framer Motion)
- Filter by domain
- Shuffle / sequential mode
- Track "Know it" vs "Review again" per card
- Progress counter

### 6. Practice Quiz (`/quiz`)
- 100+ multiple-choice questions (Performance-Based simulation style)
- Filter: by domain, all domains, timed (90 min) or untimed
- Per-question explanation after answer
- Score summary with domain breakdown at end
- Wrong answers saved for review

### 7. Glossary (`/glossary`)
- All ~200 Security+ acronyms + key terms
- Alphabetical index nav
- Search/filter input
- Each entry: acronym → full name → one-line definition

### 8. Exam Tips (`/exam-tips`)
- Test-taking strategies
- Common traps and how to avoid them
- Time management during 90-min exam
- Last-week study checklist
- Exam day logistics

---

## Security+ SY0-701 Content Structure

### Domain 1 — General Security Concepts (12%)
Topics: Security controls (technical/managerial/operational/physical), CIA triad, AAA, authentication methods, cryptography fundamentals (symmetric/asymmetric/hashing), PKI & certificates, key exchange, digital signatures, zero trust, security frameworks (NIST, ISO 27001, SOC), change management, asset management.

### Domain 2 — Threats, Vulnerabilities & Mitigations (22%)
Topics: Threat actors (nation-state, insider, hacktivist, APT), attack vectors (phishing, vishing, smishing, social engineering), malware types (ransomware, rootkit, trojan, worm, spyware, keylogger, fileless), vulnerability scanning vs pen testing, CVE/CVSS, OSINT, threat feeds, indicators of compromise (IoC), indicators of attack (IoA), attack surface reduction.

### Domain 3 — Security Architecture (18%)
Topics: Network segmentation (VLANs, DMZ, screened subnet), cloud security models (IaaS/PaaS/SaaS, shared responsibility), virtualization security, containerization (Docker, Kubernetes), SD-WAN, SASE, zero trust architecture, identity federation, IAM, privileged access management, secure protocols (TLS, SSH, SFTP, HTTPS), cryptographic implementations, hardening techniques.

### Domain 4 — Security Operations (28%)
Topics: Incident response lifecycle (prepare/identify/contain/eradicate/recover/lessons learned), digital forensics (chain of custody, order of volatility, imaging), log monitoring & SIEM, EDR/XDR, IDS/IPS, firewall types (stateful, NGFW, WAF), network monitoring, honeypots/honeynets, endpoint hardening, patch management, identity lifecycle management, MFA, SSO, RBAC/ABAC, data loss prevention, email security (SPF, DKIM, DMARC).

### Domain 5 — Security Program Management & Oversight (20%)
Topics: Risk management (assessment, tolerance, appetite, register), qualitative vs quantitative risk, BCP/DR, RTO/RPO, compliance frameworks (HIPAA, PCI-DSS, GDPR, FISMA, CMMC), data classifications, privacy concepts, vendor management (SLA, MSSP, supply chain risk), security awareness training, phishing simulations, auditing & assessments (pen test, vulnerability assessment, red/blue/purple team).

---

## Progress & Mastery System

- Each topic has a mastery state: `notStarted | inProgress | mastered`
- State persisted in `localStorage` keyed by topic ID
- Domain mastery % = (mastered topics / total topics) × 100
- Global mastery % = weighted average across all 5 domains
- Flashcard "Know it" clicks update topic mastery
- Quiz correct answers contribute to mastery signals

---

## Component Inventory

| Component | Purpose |
|---|---|
| `DomainCard` | Domain summary with mastery bar |
| `TopicAccordion` | Expandable objective list |
| `FlashCard` | Flip card with Framer Motion |
| `QuizQuestion` | MCQ with reveal + explanation |
| `MasteryBadge` | Status pill: Not Started / In Progress / Mastered |
| `ProgressRing` | SVG circular progress indicator |
| `GlossaryEntry` | Term + definition row |
| `Sidebar` | Domain nav, persistent on desktop |
| `PageHeader` | Playfair Display hero area per page |
| `GoldButton` | Primary CTA button |

---

## File Structure

```
src/
  components/         ← shared UI components
  pages/              ← route-level page components
  data/
    domains.js        ← all domain/topic/objective content
    flashcards.js     ← ~300 flashcard entries
    quiz.js           ← 100+ quiz questions with answers + explanations
    glossary.js       ← acronyms + terms A–Z
  hooks/
    useProgress.js    ← localStorage mastery read/write
  styles/
    globals.css       ← CSS variables + reset
    components.css    ← shared component styles
  App.jsx
  main.jsx
```

---

## Verification

1. `npm run dev` → site loads at localhost:5173 with correct design system
2. Navigate all 8 routes — no 404s, no console errors
3. Mark a topic as mastered → dashboard progress ring updates
4. Complete a flashcard session → "Know it" count persists on refresh
5. Run a practice quiz → score + domain breakdown shown, wrong answers reviewable
6. Glossary search → filters in real-time
7. Mobile responsive (375px min-width)
