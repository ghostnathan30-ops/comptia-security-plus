import { motion } from 'framer-motion';

const TYPE_META = {
  ordering:  { label: 'Sequence',  color: '#3B82F6' },
  matching:  { label: 'Matching',  color: '#8B5CF6' },
  scenario:  { label: 'Scenario',  color: '#10B981' },
  configure: { label: 'Configure', color: '#F59E0B' },
  identify:  { label: 'Identify',  color: '#F43F5E' },
};

const DOMAIN_NAMES = {
  1: 'General Security',
  2: 'Threats & Vulns',
  3: 'Architecture',
  4: 'Security Ops',
  5: 'Risk Management',
};

export default function LabCard({ lab, completion, onSelect, index }) {
  const meta = TYPE_META[lab.type] || { label: lab.type, color: '#888' };
  const status = completion?.passed ? 'passed' : completion?.attempts > 0 ? 'attempted' : 'new';

  return (
    <motion.div
      className={`lab-card lab-card--${status}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.28 }}
      onClick={() => onSelect(lab.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(lab.id)}
      style={{ '--domain-color': `var(--d${lab.domain})` }}
    >
      <div className="lab-card__header">
        <span
          className="lab-type-badge"
          style={{
            background: meta.color + '1a',
            color: meta.color,
            border: `1px solid ${meta.color}44`,
          }}
        >
          {meta.label}
        </span>
        <span className={`lab-status-badge lab-status-badge--${status}`}>
          {status === 'passed' ? '✓ Passed' : status === 'attempted' ? 'In Progress' : 'New'}
        </span>
      </div>

      <h3 className="lab-card__title">{lab.title}</h3>
      <p className="lab-card__desc">{lab.description}</p>

      <div className="lab-card__footer">
        <span className="domain-dot" style={{ background: `var(--d${lab.domain})` }} />
        <span className="domain-label">{DOMAIN_NAMES[lab.domain]}</span>
        <span className={`difficulty-badge difficulty--${lab.difficulty}`}>{lab.difficulty}</span>
        {lab.examRelevance === 'high' && (
          <span className="exam-focus-badge">Exam Focus</span>
        )}
      </div>
    </motion.div>
  );
}
