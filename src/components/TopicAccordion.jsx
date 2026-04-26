import { useState } from 'react';
import { Link } from 'react-router-dom';
import MasteryBadge from './MasteryBadge';

export default function TopicAccordion({ topic, domainId, masteryState, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-item">
      <div
        className="accordion-header"
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
      >
        <div style={{ flex: 1 }}>
          <div className="accordion-title">{topic.title}</div>
          {topic.objectives && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 3 }}>
              Objective{topic.objectives.length > 1 ? 's' : ''}: {topic.objectives.join(', ')}
            </div>
          )}
        </div>

        <MasteryBadge state={masteryState} />

        <span className={`accordion-chevron${open ? ' open' : ''}`}>▾</span>
      </div>

      {open && (
        <div className="accordion-body" style={{ paddingTop: 16 }}>
          {/* Key points preview */}
          {topic.keyPoints && topic.keyPoints.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 8 }}>
                Key Points
              </div>
              <ul style={{ paddingLeft: '1rem' }}>
                {topic.keyPoints.slice(0, 3).map((pt, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text)', marginBottom: 4 }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              to={`/domains/${domainId}/${topic.id}`}
              className="btn btn-gold btn-sm"
            >
              Full Study Notes →
            </Link>
            <button
              onClick={e => { e.stopPropagation(); onToggle(topic.id); }}
              className="btn btn-outline btn-sm"
            >
              {masteryState === 'mastered' ? '↩ Unmark' : masteryState === 'inProgress' ? '✓ Mark Mastered' : '▶ Mark In Progress'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
