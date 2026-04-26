import { Link } from 'react-router-dom';

const domainTextColors = ['d1-text', 'd2-text', 'd3-text', 'd4-text', 'd5-text'];
const domainBgColors = [
  'rgba(155,123,76,0.08)',
  'rgba(123,107,155,0.08)',
  'rgba(76,123,155,0.08)',
  'rgba(76,155,123,0.08)',
  'rgba(155,76,76,0.08)',
];

export default function DomainCard({ domain, progress = 0, idx = 0, compact = false }) {
  const colorClass = domainTextColors[idx] || 'd1-text';
  const bgColor = domainBgColors[idx] || domainBgColors[0];

  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: domain.color,
        borderRadius: '20px 20px 0 0',
      }} />

      <div style={{ paddingTop: 8 }}>
        {/* Domain number */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 10,
          background: bgColor,
          marginBottom: 14,
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.1rem',
        }} className={colorClass}>
          D{domain.id}
        </div>

        <h3 style={{ fontSize: '1.05rem', marginBottom: 6, lineHeight: 1.3 }}>
          {domain.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: domain.color,
            background: bgColor,
            padding: '3px 10px',
            borderRadius: 20,
          }}>
            {domain.weight}% of exam
          </span>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            {domain.topics.length} topics
          </span>
        </div>

        {!compact && (
          <p style={{ fontSize: '0.85rem', marginBottom: 18, lineHeight: 1.6, color: 'var(--text-muted)' }}>
            {domain.description}
          </p>
        )}

        {/* Progress bar */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Mastery
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: domain.color }}>
              {progress}%
            </span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%`, background: domain.color }}
            />
          </div>
        </div>

        {!compact && (
          <Link
            to={`/domains/${domain.id}`}
            className="btn btn-outline btn-sm"
            style={{ marginTop: 20, borderColor: domain.color, color: domain.color }}
          >
            Study Domain →
          </Link>
        )}
      </div>
    </div>
  );
}
