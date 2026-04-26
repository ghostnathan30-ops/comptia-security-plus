import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import glossary from '../data/glossary';
import PageHeader from '../components/PageHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState(null);
  const sectionRefs = useRef({});

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return glossary;
    return glossary.filter(
      g =>
        g.term.toLowerCase().includes(q) ||
        (g.fullName && g.fullName.toLowerCase().includes(q)) ||
        g.definition.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(g => {
      const letter = g.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(g);
    });
    return groups;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  const scrollToLetter = (letter) => {
    setActiveLetter(letter);
    sectionRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div initial="hidden" animate="visible">
      <motion.div variants={fadeUp} custom={0}>
        <PageHeader
          eyebrow="Reference"
          title="Glossary"
          description="All Security+ acronyms and terms. Search or browse A–Z."
        />
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 24 }}>
        <input
          className="search-input"
          type="text"
          placeholder="Search terms, acronyms, or definitions..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setActiveLetter(null);
          }}
        />
      </motion.div>

      {/* A-Z index */}
      <motion.div variants={fadeUp} custom={2} style={{ marginBottom: 24 }}>
        <div className="alpha-index">
          {ALL_LETTERS.map(letter => (
            <button
              key={letter}
              className={`alpha-btn${activeLetter === letter ? ' active' : ''}${
                !grouped[letter] ? ' disabled' : ''
              }`}
              disabled={!grouped[letter]}
              onClick={() => grouped[letter] && scrollToLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Count */}
      <motion.div
        variants={fadeUp}
        custom={3}
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          fontWeight: 500,
          marginBottom: 28,
        }}
      >
        Showing <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> terms
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveLetter(null);
            }}
            style={{
              marginLeft: 12,
              background: 'none',
              border: 'none',
              color: 'var(--gold)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            Clear search ×
          </button>
        )}
      </motion.div>

      {/* Zero results */}
      {letters.length === 0 && (
        <motion.div variants={fadeUp} custom={4} style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>◈</div>
          <h2 style={{ marginBottom: 12 }}>No terms found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
            No results for "{searchQuery}". Try a different search term.
          </p>
          <button
            className="btn btn-gold"
            onClick={() => {
              setSearchQuery('');
              setActiveLetter(null);
            }}
          >
            Clear Search
          </button>
        </motion.div>
      )}

      {/* Glossary entries by letter */}
      {letters.map((letter, li) => (
        <motion.div
          key={letter}
          variants={fadeUp}
          custom={4 + li}
          style={{ marginBottom: 40 }}
          ref={el => (sectionRefs.current[letter] = el)}
        >
          {/* Letter header */}
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--gold)',
              marginBottom: 12,
              paddingBottom: 8,
              borderBottom: '2px solid var(--gold-pale)',
              lineHeight: 1,
            }}
          >
            {letter}
          </div>

          {/* Entries */}
          <div>
            {grouped[letter].map((entry, ei) => (
              <div key={ei} className="glossary-entry">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                  <span className="glossary-term">{entry.term}</span>
                  {entry.fullName && (
                    <span className="glossary-full">{entry.fullName}</span>
                  )}
                </div>
                <p className="glossary-def">{entry.definition}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
