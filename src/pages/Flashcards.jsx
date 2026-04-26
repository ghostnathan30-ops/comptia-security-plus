import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import flashcards from '../data/flashcards';
import FlashCard from '../components/FlashCard';
import PageHeader from '../components/PageHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const domainNames = {
  1: 'General Security Concepts',
  2: 'Threats & Vulnerabilities',
  3: 'Security Architecture',
  4: 'Security Operations',
  5: 'Program Management',
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards({ flashcardMastery, setFlashcardMastery, getFlashcardStats }) {
  const [domainFilter, setDomainFilter] = useState(0); // 0 = All
  const [showOnlyLearning, setShowOnlyLearning] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ known: 0, learning: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const filteredCards = useMemo(() => {
    let cards = flashcards;
    if (domainFilter) cards = cards.filter(c => c.domainId === domainFilter);
    if (showOnlyLearning) cards = cards.filter(c => flashcardMastery[c.id] !== 'known');
    return cards;
  }, [domainFilter, showOnlyLearning, flashcardMastery]);

  // Reset deck when filters or shuffle changes
  useEffect(() => {
    const newDeck = isShuffled ? shuffle(filteredCards) : [...filteredCards];
    setDeck(newDeck);
    setCurrentIndex(0);
    setSessionStats({ known: 0, learning: 0, total: 0 });
    setIsComplete(false);
  }, [filteredCards, isShuffled]);

  const advance = (statsUpdate) => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= deck.length) {
      setSessionStats(prev => ({
        ...prev,
        ...statsUpdate,
        total: deck.length,
      }));
      setIsComplete(true);
    } else {
      setSessionStats(prev => ({ ...prev, ...statsUpdate }));
      setCurrentIndex(nextIdx);
    }
  };

  const handleKnow = () => {
    const card = deck[currentIndex];
    setFlashcardMastery(card.id, 'known');
    advance({ known: sessionStats.known + 1 });
  };

  const handleReview = () => {
    const card = deck[currentIndex];
    setFlashcardMastery(card.id, 'learning');
    advance({ learning: sessionStats.learning + 1 });
  };

  const handleRestart = () => {
    const newDeck = isShuffled ? shuffle(filteredCards) : [...filteredCards];
    setDeck(newDeck);
    setCurrentIndex(0);
    setSessionStats({ known: 0, learning: 0, total: 0 });
    setIsComplete(false);
  };

  const handleStudyLearning = () => {
    setShowOnlyLearning(true);
    setIsComplete(false);
  };

  const stats = getFlashcardStats();
  const progress = deck.length > 0 ? ((currentIndex) / deck.length) * 100 : 0;

  return (
    <motion.div initial="hidden" animate="visible">
      <motion.div variants={fadeUp} custom={0}>
        <PageHeader
          eyebrow="Study Mode"
          title="Flashcards"
          description="Click any card to reveal the answer. Mark cards as known to track your progress."
        />
      </motion.div>

      {/* Controls bar */}
      <motion.div
        variants={fadeUp}
        custom={1}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          marginBottom: 28,
          padding: '16px 20px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        {/* Domain filter */}
        <select
          className="gold-select"
          value={domainFilter}
          onChange={e => setDomainFilter(Number(e.target.value))}
          style={{ minWidth: 200 }}
        >
          <option value={0}>All Domains</option>
          {[1, 2, 3, 4, 5].map(d => (
            <option key={d} value={d}>
              Domain {d}: {domainNames[d]}
            </option>
          ))}
        </select>

        {/* Still learning toggle */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text)',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={showOnlyLearning}
            onChange={e => setShowOnlyLearning(e.target.checked)}
            style={{ accentColor: 'var(--gold)', width: 16, height: 16, cursor: 'pointer' }}
          />
          Still Learning Only
        </label>

        {/* Shuffle toggle */}
        <button
          className={`btn btn-sm ${isShuffled ? 'btn-gold' : 'btn-outline'}`}
          onClick={() => setIsShuffled(s => !s)}
        >
          ⇌ Shuffle {isShuffled ? 'ON' : 'OFF'}
        </button>

        {/* Stats */}
        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{stats.known}</span> known
          {' · '}
          <span style={{ fontWeight: 700 }}>{filteredCards.length}</span> in deck
        </div>
      </motion.div>

      {deck.length === 0 ? (
        <motion.div variants={fadeUp} custom={2}>
          <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>◈</div>
            <h2 style={{ marginBottom: 12 }}>No cards in deck</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
              {showOnlyLearning
                ? 'You have marked all cards in this domain as known!'
                : 'No cards found for this filter combination.'}
            </p>
            <button
              className="btn btn-gold"
              onClick={() => {
                setShowOnlyLearning(false);
                setDomainFilter(0);
              }}
            >
              Show All Cards
            </button>
          </div>
        </motion.div>
      ) : isComplete ? (
        /* Completion screen */
        <motion.div variants={fadeUp} custom={2}>
          <div className="card" style={{ textAlign: 'center', padding: '56px 40px', maxWidth: 560, margin: '0 auto' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>✓</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: 12 }}>
              Session Complete!
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.95rem' }}>
              You knew{' '}
              <strong style={{ color: 'var(--text)' }}>
                {sessionStats.known} of {deck.length}
              </strong>{' '}
              cards
            </p>

            {/* Score display */}
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'var(--gold-pale)',
                borderRadius: 'var(--radius)',
                padding: '24px 48px',
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}
              >
                {deck.length > 0 ? Math.round((sessionStats.known / deck.length) * 100) : 0}%
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6, fontWeight: 500 }}>
                Known
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-outline" onClick={handleRestart}>
                ↺ Restart Deck
              </button>
              <button
                className="btn btn-gold"
                onClick={handleStudyLearning}
                disabled={sessionStats.learning === 0}
              >
                ↩ Study Still Learning
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Active study */
        <motion.div variants={fadeUp} custom={2}>
          {/* Progress bar */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              <span>Card {currentIndex + 1} of {deck.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
              />
            </div>
          </div>

          {/* FlashCard */}
          <FlashCard
            card={deck[currentIndex]}
            onKnow={handleKnow}
            onReview={handleReview}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
