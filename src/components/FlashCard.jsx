import { useState } from 'react';

const domainNames = {
  1: 'General Security',
  2: 'Threats & Vulnerabilities',
  3: 'Security Architecture',
  4: 'Security Operations',
  5: 'Program Management',
};

export default function FlashCard({ card, onKnow, onReview }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(f => !f);

  const handleKnow = (e) => {
    e.stopPropagation();
    setFlipped(false);
    onKnow?.();
  };

  const handleReview = (e) => {
    e.stopPropagation();
    setFlipped(false);
    onReview?.();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        className="flashcard-scene"
        onClick={handleFlip}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === ' ' || e.key === 'Enter' ? handleFlip() : null}
        aria-label={flipped ? 'Show question' : 'Show answer'}
      >
        <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-face flashcard-front">
            <span className="flashcard-domain-tag">
              Domain {card.domainId} · {domainNames[card.domainId]}
            </span>
            <div className="fc-text">{card.front}</div>
            <span className="flashcard-flip-hint">Click to reveal answer</span>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back">
            <span className="flashcard-domain-tag">
              Domain {card.domainId} · {domainNames[card.domainId]}
            </span>
            <div className="fc-text">{card.back}</div>
            <span className="flashcard-flip-hint">Click to flip back</span>
          </div>
        </div>
      </div>

      {/* Action buttons - only show when flipped */}
      <div style={{
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        opacity: flipped ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: flipped ? 'auto' : 'none',
      }}>
        <button onClick={handleReview} className="btn btn-outline btn-sm">
          ↩ Review Again
        </button>
        <button onClick={handleKnow} className="btn btn-gold btn-sm">
          ✓ Know It
        </button>
      </div>
    </div>
  );
}
