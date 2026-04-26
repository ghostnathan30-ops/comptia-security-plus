# CompTIA Security+ Study App

An interactive, full-featured React study application for the CompTIA Security+ (SY0-701) exam. Covers all exam domains with flashcards, quizzes, a glossary, and progress tracking.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=flat-square)

## Features

- **Domain overview** — all SY0-701 exam domains with progress tracking per topic
- **Topic deep-dives** — detailed breakdowns of every exam objective
- **Flashcard system** — full card library with mastery tracking
- **Quiz engine** — timed quizzes with score history and per-domain analytics
- **Glossary** — searchable reference of key Security+ terminology
- **Exam tips** — curated strategies for exam day
- **Progress persistence** — mastery state and quiz history saved to localStorage
- **Streak tracking** — daily study streak counter
- **Smooth animations** via Framer Motion

## Exam Domains Covered (SY0-701)

| Domain | Weight |
|--------|--------|
| 1.0 General Security Concepts | 12% |
| 2.0 Threats, Vulnerabilities & Mitigations | 22% |
| 3.0 Security Architecture | 18% |
| 4.0 Security Operations | 28% |
| 5.0 Security Program Management & Oversight | 20% |

## Tech Stack

- **Framework**: React 18
- **Bundler**: Vite 5
- **Routing**: React Router v6
- **Animations**: Framer Motion 11
- **State**: Custom `useProgress` hook with localStorage persistence

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ghostnathan30/comptia-security-plus.git
cd comptia-security-plus

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

```bash
# Build for production
npm run build
```

## Project Structure

```
src/
├── App.jsx               # Root component + route definitions
├── pages/
│   ├── Dashboard.jsx     # Global progress overview
│   ├── DomainsOverview.jsx
│   ├── DomainDetail.jsx  # Per-domain topic list with mastery
│   ├── TopicDeepDive.jsx # Full objective content
│   ├── Flashcards.jsx    # Card study mode
│   ├── Quiz.jsx          # Quiz engine
│   ├── Glossary.jsx      # Searchable term reference
│   └── ExamTips.jsx
├── components/
│   ├── Sidebar.jsx
│   ├── DomainCard.jsx
│   ├── FlashCard.jsx
│   ├── QuizQuestion.jsx
│   ├── ProgressRing.jsx
│   ├── MasteryBadge.jsx
│   ├── TopicAccordion.jsx
│   └── PageHeader.jsx
├── hooks/
│   └── useProgress.js    # Progress state, mastery, streaks, quiz history
└── data/
    ├── domains.js        # All domain + topic content
    ├── flashcards.js     # Full flashcard library
    ├── quiz.js           # Quiz question bank
    ├── glossary.js       # Glossary terms
    └── examTips.js       # Exam strategy content
```

## License

MIT
