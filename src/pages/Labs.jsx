import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { labs } from '../data/labs.js';
import LabCard from '../components/LabCard.jsx';
import OrderingLab from '../components/lab-types/OrderingLab.jsx';
import MatchingLab from '../components/lab-types/MatchingLab.jsx';
import ScenarioLab from '../components/lab-types/ScenarioLab.jsx';
import ConfigureLab from '../components/lab-types/ConfigureLab.jsx';
import IdentifyLab from '../components/lab-types/IdentifyLab.jsx';

const DOMAIN_FILTERS = [
  { id: 0, label: 'All Domains' },
  { id: 1, label: 'D1 · General' },
  { id: 2, label: 'D2 · Threats' },
  { id: 3, label: 'D3 · Architecture' },
  { id: 4, label: 'D4 · Operations' },
  { id: 5, label: 'D5 · Management' },
];

const TYPE_FILTERS = [
  { id: 'all',       label: 'All Types' },
  { id: 'ordering',  label: 'Sequence' },
  { id: 'matching',  label: 'Matching' },
  { id: 'scenario',  label: 'Scenario' },
  { id: 'configure', label: 'Configure' },
  { id: 'identify',  label: 'Identify' },
];

const LAB_COMPONENTS = {
  ordering:  OrderingLab,
  matching:  MatchingLab,
  scenario:  ScenarioLab,
  configure: ConfigureLab,
  identify:  IdentifyLab,
};

const DOMAIN_COLORS = {
  1: 'var(--d1)',
  2: 'var(--d2)',
  3: 'var(--d3)',
  4: 'var(--d4)',
  5: 'var(--d5)',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Labs({ getLabCompletion, setLabCompletion, getLabStats }) {
  const [activeLab, setActiveLab] = useState(null);
  const [domainFilter, setDomainFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState('all');
  const [justCompleted, setJustCompleted] = useState(null);

  const stats = getLabStats();

  const filtered = useMemo(() => {
    return labs.filter(lab => {
      const domainOk = domainFilter === 0 || lab.domain === domainFilter;
      const typeOk = typeFilter === 'all' || lab.type === typeFilter;
      return domainOk && typeOk;
    });
  }, [domainFilter, typeFilter]);

  const handleComplete = (passed) => {
    if (!activeLab) return;
    setLabCompletion(activeLab.id, { passed });
    setJustCompleted({ passed });
  };

  const handleSelectLab = (labId) => {
    const lab = labs.find(l => l.id === labId);
    setActiveLab(lab);
    setJustCompleted(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveLab(null);
    setJustCompleted(null);
  };

  const handleNextLab = () => {
    if (!activeLab) return;
    const domainLabs = labs.filter(l => l.domain === activeLab.domain && l.id !== activeLab.id);
    const incomplete = domainLabs.find(l => !getLabCompletion(l.id)?.passed);
    const next = incomplete || domainLabs[0];
    if (next) handleSelectLab(next.id);
    else handleBack();
  };

  // ── Lab Runner Screen ────────────────────────────────────────────────────
  if (activeLab) {
    const LabComponent = LAB_COMPONENTS[activeLab.type];
    const completion = getLabCompletion(activeLab.id);
    const domainColor = DOMAIN_COLORS[activeLab.domain];

    return (
      <motion.div
        className="labs-runner"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.25 }}
      >
        <button className="labs-back-btn" onClick={handleBack}>
          ← Back to Labs
        </button>

        <div className="lab-runner-header">
          <div className="lab-runner-meta">
            <span
              className="lab-domain-pill"
              style={{
                background: domainColor.replace('var(', '').replace(')', '') + '22',
                color: domainColor,
                border: `1px solid ${domainColor}`,
                opacity: 0.9,
              }}
            >
              Domain {activeLab.domain}
            </span>
            <span className={`lab-difficulty-pill difficulty--${activeLab.difficulty}`}>
              {activeLab.difficulty}
            </span>
            {activeLab.examRelevance === 'high' && (
              <span className="exam-focus-pill">★ Exam Focus</span>
            )}
            {completion && (
              <span className={`lab-completion-pill ${completion.passed ? 'pill-passed' : 'pill-attempted'}`}>
                {completion.passed ? '✓ Passed' : `Attempt ${completion.attempts}`}
              </span>
            )}
          </div>
          <h1 className="lab-runner-title">{activeLab.title}</h1>
          <p className="lab-runner-desc">{activeLab.description}</p>
        </div>

        <div className="lab-runner-body card">
          <LabComponent key={activeLab.id} lab={activeLab} onComplete={handleComplete} />
        </div>

        {justCompleted && (
          <motion.div
            className={`lab-completion-banner ${justCompleted.passed ? 'banner-passed' : 'banner-retry'}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {justCompleted.passed ? (
              <>
                <span>Lab complete — well done!</span>
                <button className="btn btn-gold btn-sm" onClick={handleNextLab}>Next Lab →</button>
              </>
            ) : (
              <>
                <span>Review the explanations above and try again.</span>
                <button className="btn btn-outline btn-sm" onClick={handleBack}>All Labs</button>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  }

  // ── Select Screen ────────────────────────────────────────────────────────
  return (
    <motion.div
      className="labs-page"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.25 }}
    >
      <div className="labs-page-header">
        <div className="labs-header-text">
          <p className="page-eyebrow">Practice Labs</p>
          <h1 className="page-title">Interactive Labs & PBQ Simulator</h1>
          <p className="page-subtitle">
            Hands-on labs that mirror CompTIA Security+ performance-based questions. Sequence processes, match concepts, configure systems, and analyze real-world scenarios — exactly the way the exam tests you.
          </p>
        </div>
        <div className="labs-stats-bar">
          <div className="labs-stat">
            <span className="stat-value">{stats.passed}</span>
            <span className="stat-label">Passed</span>
          </div>
          <div className="labs-stat">
            <span className="stat-value">{stats.attempted}</span>
            <span className="stat-label">Attempted</span>
          </div>
          <div className="labs-stat">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="labs-stat-progress">
            <div className="labs-progress-track">
              <div
                className="labs-progress-fill"
                style={{ width: `${(stats.passed / stats.total) * 100}%` }}
              />
            </div>
            <span className="labs-progress-label">
              {Math.round((stats.passed / stats.total) * 100)}% complete
            </span>
          </div>
        </div>
      </div>

      <div className="labs-filters">
        <div className="filter-group">
          {DOMAIN_FILTERS.map(f => (
            <button
              key={f.id}
              className={`filter-btn ${domainFilter === f.id ? 'active' : ''}`}
              onClick={() => setDomainFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="filter-group">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.id}
              className={`filter-btn ${typeFilter === f.id ? 'active' : ''}`}
              onClick={() => setTypeFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="labs-count">
        Showing {filtered.length} of {labs.length} labs
      </p>

      <div className="labs-grid">
        <AnimatePresence>
          {filtered.map((lab, i) => (
            <LabCard
              key={lab.id}
              lab={lab}
              completion={getLabCompletion(lab.id)}
              onSelect={handleSelectLab}
              index={i}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
