import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import domains from '../data/domains';
import MasteryBadge from '../components/MasteryBadge';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const domainTextColors = ['d1-text', 'd2-text', 'd3-text', 'd4-text', 'd5-text'];

/**
 * Converts **text** markers to <strong> elements within a string.
 */
function parseBold(text) {
  const parts = text.split(/\*\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

/**
 * Renders a markdown-like notes string as structured JSX.
 * - Paragraphs separated by blank lines (\n\n)
 * - Lines starting with "**" and ending with "**" or "**:" → <h4>
 * - Lines starting with "- " → <li> grouped into <ul>
 * - Other lines → <p> with bold parsing
 */
function renderNotes(notes) {
  const paragraphs = notes.split(/\n\n+/);

  return paragraphs.map((para, paraIdx) => {
    const lines = para.split('\n').filter(l => l.trim() !== '');
    const elements = [];
    let listBuffer = [];

    const flushList = (key) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`ul-${key}`} style={{ paddingLeft: '1.25rem', margin: '8px 0 12px' }}>
            {listBuffer.map((item, i) => (
              <li key={i} style={{ marginBottom: 6, lineHeight: 1.65 }}>
                {parseBold(item)}
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();

      // Header pattern: **Some Title** or **Some Title:**
      if (trimmed.startsWith('**') && (trimmed.endsWith('**') || trimmed.endsWith('**:'))) {
        flushList(lineIdx);
        const text = trimmed.replace(/^\*\*/, '').replace(/\*\*:?$/, '');
        elements.push(
          <h4
            key={`h4-${lineIdx}`}
            style={{
              marginTop: lineIdx === 0 ? 0 : 20,
              marginBottom: 8,
              color: 'var(--text)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {text}
          </h4>
        );
        return;
      }

      // List item
      if (trimmed.startsWith('- ')) {
        listBuffer.push(trimmed.slice(2));
        return;
      }

      // Regular paragraph line
      flushList(lineIdx);
      if (trimmed) {
        elements.push(
          <p key={`p-${lineIdx}`} style={{ marginBottom: 8, lineHeight: 1.7 }}>
            {parseBold(trimmed)}
          </p>
        );
      }
    });

    flushList(`end-${paraIdx}`);

    return (
      <div key={`para-${paraIdx}`} style={{ marginBottom: 12 }}>
        {elements}
      </div>
    );
  });
}

export default function TopicDeepDive({ getTopicMastery, setMastery }) {
  const { domainId, topicId } = useParams();

  const domain = domains.find(d => d.id === parseInt(domainId));
  if (!domain) return <Navigate to="/domains" replace />;

  const topicIndex = domain.topics.findIndex(t => t.id === topicId);
  const topic = domain.topics[topicIndex];
  if (!topic) return <Navigate to={`/domains/${domainId}`} replace />;

  const domainIdx = domains.findIndex(d => d.id === parseInt(domainId));
  const colorClass = domainTextColors[domainIdx] || 'd1-text';

  const prevTopic = topicIndex > 0 ? domain.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < domain.topics.length - 1 ? domain.topics[topicIndex + 1] : null;

  const currentMastery = getTopicMastery(topic.id);

  const handleMasteryAction = (newState) => {
    setMastery(topic.id, newState);
  };

  return (
    <motion.div initial="hidden" animate="visible" style={{ maxWidth: 820 }}>
      {/* Breadcrumb */}
      <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 28 }}>
        <Link
          to={`/domains/${domainId}`}
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
          }}
        >
          ← Domain {domain.id}: {domain.name}
        </Link>
      </motion.div>

      {/* Topic header */}
      <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 32 }}>
        <div
          className={colorClass}
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          Domain {domain.id} · Objective {topic.objectives.join(', ')}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.1rem',
            lineHeight: 1.25,
            marginBottom: 0,
          }}
        >
          {topic.title}
        </h1>
      </motion.div>

      {/* Mastery status row */}
      <motion.div
        variants={fadeUp}
        custom={2}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 40,
          padding: '16px 20px',
          background: 'var(--gold-pale)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Your status:
        </span>
        <MasteryBadge state={currentMastery} />

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {currentMastery === 'mastered' && (
            <>
              <button className="btn btn-gold btn-sm" disabled>
                ✓ Mastered
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleMasteryAction('inProgress')}
              >
                Mark as In Progress
              </button>
            </>
          )}

          {currentMastery === 'inProgress' && (
            <>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => handleMasteryAction('mastered')}
              >
                ✓ Mark as Mastered
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleMasteryAction('notStarted')}
              >
                Reset
              </button>
            </>
          )}

          {currentMastery === 'notStarted' && (
            <>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleMasteryAction('inProgress')}
              >
                ▶ Start Studying
              </button>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => handleMasteryAction('mastered')}
              >
                ✓ Mark as Mastered
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Study Notes */}
      <motion.div variants={fadeUp} custom={3} style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Study Notes</h2>
        <div
          className="card-flat"
          style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.75 }}
        >
          {renderNotes(topic.notes)}
        </div>
      </motion.div>

      {/* Key Points */}
      {topic.keyPoints && topic.keyPoints.length > 0 && (
        <motion.div variants={fadeUp} custom={4} style={{ marginBottom: 28 }}>
          <div className="callout callout-key">
            <div className="callout-label">Key Points</div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
              {topic.keyPoints.map((pt, i) => (
                <li key={i} style={{ marginBottom: 8, lineHeight: 1.65, fontSize: '0.93rem' }}>
                  {parseBold(pt)}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Mnemonic */}
      {topic.mnemonics && (
        <motion.div variants={fadeUp} custom={5} style={{ marginBottom: 28 }}>
          <div className="callout callout-tip">
            <div className="callout-label">Memory Aid</div>
            <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.93rem', lineHeight: 1.7 }}>
              {topic.mnemonics}
            </p>
          </div>
        </motion.div>
      )}

      {/* Acronyms */}
      {topic.acronyms && topic.acronyms.length > 0 && (
        <motion.div variants={fadeUp} custom={6} style={{ marginBottom: 40 }}>
          <div className="card-flat">
            <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Acronyms in This Topic</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--gold)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Acronym
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--gold)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Definition
                  </th>
                </tr>
              </thead>
              <tbody>
                {topic.acronyms.map((acronym, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid var(--border)',
                      background: i % 2 === 0 ? 'transparent' : 'var(--gold-pale)',
                    }}
                  >
                    <td
                      style={{
                        padding: '10px 12px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--gold)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {acronym}
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: '0.875rem' }}>
                      <Link
                        to="/glossary"
                        style={{ color: 'var(--gold)', textDecoration: 'none', fontStyle: 'italic' }}
                      >
                        See Glossary →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Prev / Next navigation */}
      <motion.div
        variants={fadeUp}
        custom={7}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          paddingTop: 32,
          borderTop: '1px solid var(--border)',
          marginTop: 16,
        }}
      >
        <div>
          {prevTopic ? (
            <Link
              to={`/domains/${domainId}/${prevTopic.id}`}
              className="btn btn-outline btn-sm"
            >
              ← {prevTopic.title}
            </Link>
          ) : (
            <Link to={`/domains/${domainId}`} className="btn btn-outline btn-sm">
              ← Back to Domain
            </Link>
          )}
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Topic {topicIndex + 1} of {domain.topics.length}
        </div>

        <div>
          {nextTopic ? (
            <Link
              to={`/domains/${domainId}/${nextTopic.id}`}
              className="btn btn-gold btn-sm"
            >
              {nextTopic.title} →
            </Link>
          ) : (
            <Link to={`/domains/${domainId}`} className="btn btn-gold btn-sm">
              Back to Domain →
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
