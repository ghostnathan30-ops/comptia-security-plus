import { useState } from 'react';

export default function ConfigureLab({ lab, onComplete }) {
  const [selections, setSelections] = useState(() =>
    Object.fromEntries(lab.rules.map(r => [r.id, r.options[0]]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (ruleId, value) => {
    if (submitted) return;
    setSelections(prev => ({ ...prev, [ruleId]: value }));
  };

  const handleSubmit = () => {
    const correct = lab.rules.filter(r => selections[r.id] === r.correct).length;
    setScore(correct);
    setSubmitted(true);
    onComplete(correct === lab.rules.length);
  };

  const handleReset = () => {
    setSelections(Object.fromEntries(lab.rules.map(r => [r.id, r.options[0]])));
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="configure-lab">
      <p className="lab-instruction">{lab.prompt}</p>

      <div className="configure-table-wrap">
        <table className="configure-table">
          <thead>
            <tr>
              <th>Rule / Setting</th>
              <th>Action</th>
              {submitted && <th>Result</th>}
            </tr>
          </thead>
          <tbody>
            {lab.rules.map(rule => {
              const isCorrect = submitted && selections[rule.id] === rule.correct;
              const isWrong = submitted && selections[rule.id] !== rule.correct;
              return (
                <tr key={rule.id} className={isCorrect ? 'row-correct' : isWrong ? 'row-incorrect' : ''}>
                  <td className="rule-cell">
                    <span className="rule-name">{rule.description}</span>
                    {rule.detail && <span className="rule-detail">{rule.detail}</span>}
                  </td>
                  <td className="select-cell">
                    <select
                      value={selections[rule.id]}
                      onChange={e => handleChange(rule.id, e.target.value)}
                      disabled={submitted}
                      className={isCorrect ? 'sel-correct' : isWrong ? 'sel-incorrect' : ''}
                    >
                      {rule.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  {submitted && (
                    <td className="result-cell">
                      {isCorrect
                        ? <span className="result-ok">✓</span>
                        : <span className="result-bad">✗ {rule.correct}</span>}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {submitted ? (
        <>
          <div className={`lab-score-banner ${score === lab.rules.length ? 'score-passed' : 'score-partial'}`}>
            <span>{score}/{lab.rules.length} rules correct</span>
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
          <button className="btn btn-gold" onClick={handleSubmit}>Submit Configuration</button>
        </div>
      )}
    </div>
  );
}
