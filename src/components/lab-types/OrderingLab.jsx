import { useState } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function OrderingLab({ lab, onComplete }) {
  const [items] = useState(() => shuffle(lab.items));
  const [sequence, setSequence] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const inSequence = (id) => sequence.some(s => s.id === id);
  const positionOf = (id) => sequence.findIndex(s => s.id === id) + 1;

  const handleItemClick = (item) => {
    if (submitted) return;
    if (inSequence(item.id)) {
      setSequence(prev => prev.filter(s => s.id !== item.id));
    } else {
      setSequence(prev => [...prev, item]);
    }
  };

  const handleSubmit = () => {
    const passed = sequence.length === lab.correct.length &&
      sequence.every((item, i) => item.id === lab.correct[i]);
    setSubmitted(true);
    onComplete(passed);
  };

  const handleReset = () => {
    setSequence([]);
    setSubmitted(false);
  };

  return (
    <div className="ordering-lab">
      <p className="lab-instruction">
        Click items below in the correct order. Click a selected item again to remove it from the sequence.
      </p>

      <div className="ordering-slots">
        {lab.correct.map((correctId, i) => {
          const item = sequence[i];
          const isCorrect = submitted && item && item.id === correctId;
          const isWrong = submitted && item && item.id !== correctId;
          return (
            <div
              key={i}
              className={`ordering-slot ${item ? 'filled' : 'empty'} ${isCorrect ? 'correct' : ''} ${isWrong ? 'incorrect' : ''}`}
            >
              <span className="slot-number">{i + 1}</span>
              <span className="slot-text">{item ? item.text : '—'}</span>
              {submitted && isCorrect && <span className="slot-icon">✓</span>}
              {submitted && isWrong && <span className="slot-icon">✗</span>}
            </div>
          );
        })}
      </div>

      <div className="ordering-items">
        {items.map(item => (
          <button
            key={item.id}
            className={`ordering-item ${inSequence(item.id) ? 'selected' : ''} ${submitted ? 'locked' : ''}`}
            onClick={() => handleItemClick(item)}
            disabled={submitted}
          >
            {inSequence(item.id) && (
              <span className="item-seq-badge">{positionOf(item.id)}</span>
            )}
            {item.text}
          </button>
        ))}
      </div>

      {!submitted ? (
        <div className="lab-actions">
          <button className="btn btn-outline btn-sm" onClick={handleReset}>Reset</button>
          <button
            className="btn btn-gold"
            onClick={handleSubmit}
            disabled={sequence.length !== lab.items.length}
          >
            Submit Order
          </button>
        </div>
      ) : (
        <div className="lab-explanation callout callout-key">
          <strong>Explanation</strong>
          <p>{lab.explanation}</p>
        </div>
      )}
    </div>
  );
}
