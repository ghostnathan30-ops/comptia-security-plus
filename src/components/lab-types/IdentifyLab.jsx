import { useState } from 'react';

export default function IdentifyLab({ lab, onComplete }) {
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const allAssigned = lab.assets.every(a => selections[a.id]);

  const handleSelect = (assetId, zone) => {
    if (submitted) return;
    setSelections(prev => ({ ...prev, [assetId]: zone }));
  };

  const handleSubmit = () => {
    const correct = lab.assets.filter(a => selections[a.id] === a.correct).length;
    setScore(correct);
    setSubmitted(true);
    onComplete(correct === lab.assets.length);
  };

  const handleReset = () => {
    setSelections({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="identify-lab">
      <p className="lab-instruction">{lab.prompt}</p>

      <div className="identify-assignments">
        {lab.assets.map(asset => {
          const isCorrect = submitted && selections[asset.id] === asset.correct;
          const isWrong = submitted && selections[asset.id] !== asset.correct;
          return (
            <div
              key={asset.id}
              className={`assignment-row ${isCorrect ? 'row-correct' : ''} ${isWrong ? 'row-incorrect' : ''}`}
            >
              <span className="asset-label">{asset.name}</span>
              <div className="zone-buttons">
                {lab.zones.map(zone => (
                  <button
                    key={zone}
                    className={[
                      'zone-btn',
                      selections[asset.id] === zone ? 'selected' : '',
                      submitted && zone === asset.correct ? 'correct-zone' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => handleSelect(asset.id, zone)}
                    disabled={submitted}
                  >
                    {zone}
                  </button>
                ))}
              </div>
              {submitted && isWrong && (
                <span className="correct-hint">✓ {asset.correct}</span>
              )}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <>
          <div className={`lab-score-banner ${score === lab.assets.length ? 'score-passed' : 'score-partial'}`}>
            <span>{score}/{lab.assets.length} correctly placed</span>
            <button className="btn btn-outline btn-sm" onClick={handleReset}>Try Again</button>
          </div>
          <div className="lab-explanation callout callout-key">
            <strong>Explanation</strong>
            <p>{lab.explanation}</p>
          </div>
        </>
      ) : (
        <div className="lab-actions">
          <button className="btn btn-outline btn-sm" onClick={handleReset}>Reset</button>
          <button className="btn btn-gold" onClick={handleSubmit} disabled={!allAssigned}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
