import { useState } from 'react';
import { motion } from 'framer-motion';
import examTips from '../data/examTips';
import PageHeader from '../components/PageHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const examFacts = [
  { label: 'Questions', value: 'Up to 90', sub: 'MCQ + PBQ' },
  { label: 'Duration', value: '90 Min', sub: '~60 sec per question' },
  { label: 'Passing Score', value: '750/900', sub: '≈ 83.3% scaled' },
  { label: 'Valid For', value: '3 Years', sub: 'CE credits required' },
];

function renderTipContent(item, idx) {
  // Callout: warning
  if (item.type === 'warning') {
    return (
      <div key={idx} className="callout callout-warn" style={{ marginBottom: 16 }}>
        <div className="callout-label">Caution</div>
        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>{item.text}</p>
      </div>
    );
  }

  // Callout: tip
  if (item.type === 'tip') {
    return (
      <div key={idx} className="callout callout-tip" style={{ marginBottom: 16 }}>
        <div className="callout-label">Pro Tip</div>
        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>{item.text}</p>
      </div>
    );
  }

  // Sub-section with title + items array
  if (item.title && item.items) {
    return (
      <div key={idx} style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gold)',
            marginBottom: 10,
          }}
        >
          {item.title}
        </div>
        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
          {item.items.map((listItem, li) => (
            <li key={li} style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 6 }}>
              {listItem}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Plain string
  if (typeof item === 'string') {
    return (
      <li key={idx} style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 6 }}>
        {item}
      </li>
    );
  }

  return null;
}

export default function ExamTips() {
  const [openSections, setOpenSections] = useState(['overview']);

  const toggleSection = (id) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <motion.div initial="hidden" animate="visible">
      <motion.div variants={fadeUp} custom={0}>
        <PageHeader
          eyebrow="SY0-701 Exam Prep"
          title="Exam Tips & Strategy"
          description="Everything you need to know about the exam format, test-taking strategies, and how to approach exam day."
        />
      </motion.div>

      {/* Quick stats row */}
      <motion.div
        variants={fadeUp}
        custom={1}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}
      >
        {examFacts.map((fact, i) => (
          <div
            key={i}
            className="card"
            style={{ textAlign: 'center', padding: '24px 20px' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.875rem',
                fontWeight: 700,
                color: 'var(--gold)',
                lineHeight: 1.1,
                marginBottom: 6,
              }}
            >
              {fact.value}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text)',
                marginBottom: 4,
              }}
            >
              {fact.label}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fact.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Accordion sections */}
      <motion.div variants={fadeUp} custom={2}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {examTips.map((section, si) => {
            const isOpen = openSections.includes(section.id);

            return (
              <motion.div key={section.id} variants={fadeUp} custom={3 + si}>
                <div className="accordion-item">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection(section.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && toggleSection(section.id)}
                  >
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span
                        style={{
                          fontSize: '1.1rem',
                          color: 'var(--gold)',
                          minWidth: 24,
                          textAlign: 'center',
                        }}
                      >
                        {section.icon}
                      </span>
                      <span className="accordion-title">{section.title}</span>
                    </div>
                    <span className={`accordion-chevron${isOpen ? ' open' : ''}`}>▾</span>
                  </div>

                  {isOpen && (
                    <div className="accordion-body" style={{ paddingTop: 20 }}>
                      {section.content.map((item, ci) => renderTipContent(item, ci))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div variants={fadeUp} custom={12} style={{ marginTop: 48 }}>
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '40px 32px',
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Ready to test your knowledge?</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            Apply what you've learned. Take a practice quiz or study flashcards to reinforce these strategies.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/quiz" className="btn btn-gold">
              ✎ Practice Quiz
            </a>
            <a href="/flashcards" className="btn btn-outline">
              ⬛ Flashcards
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
