import { useState } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchingLab({ lab, onComplete }) {
  const [shuffledDefs] = useState(() => shuffle(lab.pairs));
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongFlash, setWrongFlash] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isTermMatched = (id) => matched.some(m => m.termId === id);
  const isDefMatched = (id) => matched.some(m => m.defId === id);

  const handleTermClick = (id) => {
    if (submitted || isTermMatched(id)) return;
    setSelectedTerm(prev => (prev === id ? null : id));
    setWrongFlash(null);
  };

  const handleDefClick = (defId) => {
    if (submitted || !selectedTerm || isDefMatched(defId)) return;
    const isCorrect = selectedTerm === defId;
    if (isCorrect) {
      const next = [...matched, { termId: selectedTerm, defId }];
      setMatched(next);
      setSelectedTerm(null);
      if (next.length === lab.pairs.length) {
        setSubmitted(true);
        onComplete(true);
      }
    } else {
      setWrongFlash({ termId: selectedTerm, defId });
      setTimeout(() => {
        setWrongFlash(null);
        setSelectedTerm(null);
      }, 700);
    }
  };

  return (
    <div className="matching-lab">
      <p className="lab-instruction">
        Click a term on the left, then click its matching definition on the right. Correct pairs lock in green.
      </p>
      <div className="matching-grid">
        <div className="matching-col terms-col">
          {lab.pairs.map(pair => (
            <button
              key={pair.id}
              className={[
                'matching-term',
                selectedTerm === pair.id ? 'selected' : '',
                isTermMatched(pair.id) ? 'matched' : '',
                wrongFlash?.termId === pair.id ? 'wrong-flash' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleTermClick(pair.id)}
            >
              {pair.term}
            </button>
          ))}
        </div>
        <div className="matching-col defs-col">
          {shuffledDefs.map(pair => (
            <button
              key={pair.id}
              className={[
                'matching-def',
                isDefMatched(pair.id) ? 'matched' : '',
                selectedTerm && !isDefMatched(pair.id) ? 'targetable' : '',
                wrongFlash?.defId === pair.id ? 'wrong-flash' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleDefClick(pair.id)}
            >
              {pair.definition}
            </button>
          ))}
        </div>
      </div>
      {submitted && (
        <div className="lab-explanation callout callout-key">
          <strong>All pairs matched correctly.</strong>
          <p>{lab.explanation}</p>
        </div>
      )}
    </div>
  );
}
