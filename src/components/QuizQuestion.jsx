import { useState } from 'react';

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuizQuestion({ question, questionNumber, total, onNext }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setReveal] = useState(false);

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setReveal(true);
  };

  const handleNext = () => {
    setSelected(null);
    setReveal(false);
    onNext?.(selected === question.answer);
  };

  const getOptionClass = (idx) => {
    if (!revealed) return '';
    if (idx === question.answer) return 'revealed-correct';
    if (idx === selected && idx !== question.answer) return 'incorrect';
    return '';
  };

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Question {questionNumber} of {total}
        </span>
        <div style={{ width: 120, height: 4, background: 'var(--border)', borderRadius: 2 }}>
          <div style={{
            height: '100%',
            background: 'var(--gold)',
            borderRadius: 2,
            width: `${(questionNumber / total) * 100}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Question */}
      <div className="card-flat" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 10 }}>
          Domain {question.domainId}
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: 500, lineHeight: 1.65, margin: 0 }}>
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ marginBottom: 20 }}>
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={revealed}
            className={`quiz-option ${getOptionClass(idx)}`}
          >
            <span className="quiz-option-letter">{letters[idx]}</span>
            <span>{option.replace(/^[A-D]\.\s*/, '')}</span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {revealed && (
        <div
          className="callout callout-key"
          style={{ marginBottom: 20 }}
        >
          <div className="callout-label">
            {selected === question.answer ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7 }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleNext}
          disabled={!revealed}
          className="btn btn-gold"
        >
          {questionNumber < total ? 'Next Question →' : 'See Results →'}
        </button>
      </div>
    </div>
  );
}
