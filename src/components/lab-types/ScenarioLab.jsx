import { useState } from 'react';

export default function ScenarioLab({ lab, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const allAnswered = lab.questions.every(q => answers[q.id] !== undefined);

  const handleSelect = (qId, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    const correct = lab.questions.filter(q => answers[q.id] === q.answer).length;
    setScore(correct);
    setSubmitted(true);
    onComplete(correct === lab.questions.length);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="scenario-lab">
      <p className="lab-instruction">{lab.prompt}</p>

      <div className="scenario-artifact">
        <div className="artifact-header">
          <span className="artifact-label">{lab.artifactLabel || 'Output'}</span>
        </div>
        <pre className="artifact-content">{lab.artifact}</pre>
      </div>

      <div className="scenario-questions">
        {lab.questions.map((q, qi) => (
          <div key={q.id} className="scenario-question">
            <p className="question-text">
              <span className="q-number">Q{qi + 1}.</span> {q.question}
            </p>
            <div className="question-options">
              {q.options.map((opt, i) => {
                let cls = 'quiz-option';
                if (submitted) {
                  if (i === q.answer) cls += ' correct';
                  else if (answers[q.id] === i) cls += ' incorrect';
                } else if (answers[q.id] === i) {
                  cls += ' selected';
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleSelect(q.id, i)}
                    disabled={submitted}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="question-explanation callout callout-key">
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {submitted ? (
        <div className={`lab-score-banner ${score === lab.questions.length ? 'score-passed' : 'score-partial'}`}>
          <span>{score}/{lab.questions.length} correct</span>
          <button className="btn btn-outline btn-sm" onClick={handleReset}>Try Again</button>
        </div>
      ) : (
        <div className="lab-actions">
          <button className="btn btn-gold" onClick={handleSubmit} disabled={!allAnswered}>
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
}
