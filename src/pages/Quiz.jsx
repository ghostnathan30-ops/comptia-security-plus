import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import questions from '../data/quiz';
import QuizQuestion from '../components/QuizQuestion';
import ProgressRing from '../components/ProgressRing';
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

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getQuestions(domainFilter, mode) {
  let qs = domainFilter ? questions.filter(q => q.domainId === domainFilter) : questions;
  if (mode === 'exam') qs = shuffle(qs).slice(0, 90);
  return qs;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Quiz({ saveQuizResult, quizHistory }) {
  const [screen, setScreen] = useState('select');
  const [mode, setMode] = useState('practice'); // 'practice' | 'exam'
  const [domainFilter, setDomainFilter] = useState(0); // 0 = All

  // Quiz state
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // [{ questionId, wasCorrect, domainId }]

  // Exam-sim specific
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: selectedIndex }
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const timerRef = useRef(null);

  // Results state
  const [results, setResults] = useState(null);

  // Review accordion in results
  const [openReview, setOpenReview] = useState(null);

  // ── Timer for exam mode ──────────────────────────────────
  useEffect(() => {
    if (screen === 'quiz' && mode === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            // will trigger submit via a separate effect
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [screen, mode]);

  // Auto-submit when timer hits 0 in exam mode
  useEffect(() => {
    if (screen === 'quiz' && mode === 'exam' && timeLeft === 0) {
      submitExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // ── Start quiz ───────────────────────────────────────────
  const startQuiz = () => {
    const qs = getQuestions(domainFilter || null, mode);
    setActiveQuestions(qs);
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswers({});
    setFlagged(new Set());
    setResults(null);
    setOpenReview(null);
    if (mode === 'exam') setTimeLeft(90 * 60);
    setScreen('quiz');
  };

  // ── Practice mode: QuizQuestion calls this ───────────────
  const handlePracticeNext = (wasCorrect) => {
    const q = activeQuestions[questionIndex];
    const newAnswers = [...answers, { questionId: q.id, wasCorrect, domainId: q.domainId }];
    setAnswers(newAnswers);

    if (questionIndex + 1 >= activeQuestions.length) {
      finishPractice(newAnswers);
    } else {
      setQuestionIndex(i => i + 1);
    }
  };

  const finishPractice = (finalAnswers) => {
    const correct = finalAnswers.filter(a => a.wasCorrect).length;
    const total = finalAnswers.length;
    const result = {
      date: new Date().toISOString(),
      score: correct,
      total,
      domain: domainFilter || 'all',
      mode: 'practice',
      answers: finalAnswers,
    };
    setResults(result);
    saveQuizResult({ date: result.date, score: correct, total, domain: result.domain, mode: 'practice' });
    setScreen('results');
  };

  // ── Exam sim: selecting an option ───────────────────────
  const handleExamSelect = (questionId, idx) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: idx }));
  };

  const handleExamNext = () => {
    if (questionIndex + 1 < activeQuestions.length) {
      setQuestionIndex(i => i + 1);
    }
  };

  const handleExamPrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(i => i - 1);
    }
  };

  const toggleFlag = (qId) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const submitExam = () => {
    clearInterval(timerRef.current);
    const finalAnswers = activeQuestions.map(q => ({
      questionId: q.id,
      wasCorrect: selectedAnswers[q.id] === q.answer,
      domainId: q.domainId,
      selectedIndex: selectedAnswers[q.id] ?? null,
    }));
    const correct = finalAnswers.filter(a => a.wasCorrect).length;
    const total = activeQuestions.length;
    const result = {
      date: new Date().toISOString(),
      score: correct,
      total,
      domain: domainFilter || 'all',
      mode: 'exam',
      answers: finalAnswers,
    };
    setResults(result);
    saveQuizResult({ date: result.date, score: correct, total, domain: result.domain, mode: 'exam' });
    setAnswers(finalAnswers);
    setScreen('results');
  };

  // ── Derived results data ─────────────────────────────────
  const resultData = useMemo(() => {
    if (!results) return null;
    const correct = results.score;
    const total = results.total;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Domain breakdown
    const domainBreakdown = {};
    (results.answers || []).forEach(a => {
      if (!domainBreakdown[a.domainId]) {
        domainBreakdown[a.domainId] = { total: 0, correct: 0 };
      }
      domainBreakdown[a.domainId].total += 1;
      if (a.wasCorrect) domainBreakdown[a.domainId].correct += 1;
    });

    // Wrong answers with question data
    const wrongAnswers = (results.answers || [])
      .filter(a => !a.wasCorrect)
      .map(a => {
        const q = activeQuestions.find(q => q.id === a.questionId) ||
                  questions.find(q => q.id === a.questionId);
        return { ...a, question: q };
      })
      .filter(a => a.question);

    return { correct, total, pct, domainBreakdown, wrongAnswers };
  }, [results, activeQuestions]);

  // ── Screens ──────────────────────────────────────────────

  if (screen === 'select') {
    return (
      <motion.div initial="hidden" animate="visible">
        <motion.div variants={fadeUp} custom={0}>
          <PageHeader
            eyebrow="Security+ SY0-701"
            title="Practice Quiz"
            description="Test your knowledge across all five Security+ domains."
          />
        </motion.div>

        {/* Mode selection cards */}
        <motion.div
          variants={fadeUp}
          custom={1}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}
        >
          <div
            className="card"
            onClick={() => setMode('practice')}
            style={{
              cursor: 'pointer',
              border: mode === 'practice' ? '2px solid var(--gold)' : '1px solid var(--border)',
              transition: 'border var(--transition)',
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: 12 }}>✎</div>
            <h3 style={{ marginBottom: 10 }}>Practice Mode</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
              Study at your own pace. Instant feedback after each question with detailed explanations. No time limit.
            </p>
            {mode === 'practice' && (
              <div
                style={{
                  marginTop: 16,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                ✓ Selected
              </div>
            )}
          </div>

          <div
            className="card"
            onClick={() => setMode('exam')}
            style={{
              cursor: 'pointer',
              border: mode === 'exam' ? '2px solid var(--gold)' : '1px solid var(--border)',
              transition: 'border var(--transition)',
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: 12 }}>⏱</div>
            <h3 style={{ marginBottom: 10 }}>Exam Simulation</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
              90 questions, 90 minutes. No feedback until submission. Simulates real exam conditions and builds time management skills.
            </p>
            {mode === 'exam' && (
              <div
                style={{
                  marginTop: 16,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                ✓ Selected
              </div>
            )}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="card-flat"
          style={{ marginBottom: 32 }}
        >
          <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Quiz Settings</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Domain Filter:
            </label>
            <select
              className="gold-select"
              value={domainFilter}
              onChange={e => setDomainFilter(Number(e.target.value))}
              style={{ minWidth: 220 }}
            >
              <option value={0}>All Domains</option>
              {[1, 2, 3, 4, 5].map(d => (
                <option key={d} value={d}>
                  Domain {d}: {domainNames[d]}
                </option>
              ))}
            </select>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {domainFilter
                ? `${questions.filter(q => q.domainId === domainFilter).length} questions available`
                : `${questions.length} questions available`}
            </span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={3}>
          <button className="btn btn-gold btn-lg" onClick={startQuiz}>
            Start Quiz →
          </button>
        </motion.div>

        {/* Recent history */}
        {quizHistory.length > 0 && (
          <motion.div variants={fadeUp} custom={4} style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: 16 }}>Recent Sessions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {quizHistory.map((h, i) => {
                const pct = h.total > 0 ? Math.round((h.score / h.total) * 100) : 0;
                return (
                  <div
                    key={i}
                    className="card-flat"
                    style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
                  >
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(h.date).toLocaleDateString()} · {h.mode === 'exam' ? 'Exam Sim' : 'Practice'} ·{' '}
                        Domain {h.domain === 'all' ? 'All' : h.domain}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, color: pct >= 75 ? '#4C9B7B' : pct >= 60 ? '#9B7B4C' : '#9B4C4C' }}>
                      {h.score}/{h.total} ({pct}%)
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 20,
                        background: pct >= 75 ? 'var(--emerald-dim)' : 'var(--gold-dim)',
                        color: pct >= 75 ? 'var(--emerald)' : 'var(--gold)',
                      }}
                    >
                      {pct >= 75 ? 'PASS' : 'NEEDS WORK'}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // ── Quiz Screen ─────────────────────────────────────────
  if (screen === 'quiz') {
    const currentQ = activeQuestions[questionIndex];
    if (!currentQ) return null;

    const correctSoFar = answers.filter(a => a.wasCorrect).length;
    const progressPct = ((questionIndex) / activeQuestions.length) * 100;

    if (mode === 'practice') {
      return (
        <motion.div initial="hidden" animate="visible">
          {/* Top bar */}
          <motion.div
            variants={fadeUp}
            custom={0}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Practice Mode
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold)' }}>
              Score: {correctSoFar}/{questionIndex}
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 28 }}>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPct}%`, transition: 'width 0.3s ease' }}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={2}>
            <QuizQuestion
              question={currentQ}
              questionNumber={questionIndex + 1}
              total={activeQuestions.length}
              onNext={handlePracticeNext}
            />
          </motion.div>
        </motion.div>
      );
    }

    // Exam mode
    const isSelected = selectedAnswers[currentQ.id] !== undefined;
    const isFlagged = flagged.has(currentQ.id);
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <motion.div initial="hidden" animate="visible">
        {/* Exam top bar */}
        <motion.div
          variants={fadeUp}
          custom={0}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            padding: '12px 20px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Exam Simulation · {answeredCount}/{activeQuestions.length} answered
          </div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: timeLeft < 600 ? '#9B4C4C' : 'var(--text)',
              letterSpacing: '0.05em',
            }}
          >
            {formatTime(timeLeft)}
          </div>
          <button
            className="btn btn-gold btn-sm"
            onClick={submitExam}
          >
            Submit Exam
          </button>
        </motion.div>

        {/* Progress bar */}
        <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 24 }}>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${((questionIndex + 1) / activeQuestions.length) * 100}%`,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <motion.div variants={fadeUp} custom={2}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Question {questionIndex + 1} of {activeQuestions.length}
              {isFlagged && (
                <span style={{ marginLeft: 10, color: '#9B7B4C', fontWeight: 700 }}>⚑ Flagged</span>
              )}
            </span>
            <button
              className={`btn btn-sm ${isFlagged ? 'btn-gold' : 'btn-outline'}`}
              onClick={() => toggleFlag(currentQ.id)}
            >
              {isFlagged ? '⚑ Flagged' : '⚐ Flag'}
            </button>
          </div>

          <div className="card-flat" style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--gold)',
                marginBottom: 10,
              }}
            >
              Domain {currentQ.domainId}
            </div>
            <p style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.65, margin: 0 }}>
              {currentQ.question}
            </p>
          </div>

          {/* Options */}
          <div style={{ marginBottom: 24 }}>
            {currentQ.options.map((option, idx) => {
              const sel = selectedAnswers[currentQ.id];
              const isChosen = sel === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleExamSelect(currentQ.id, idx)}
                  className={`quiz-option${isChosen ? ' revealed-correct' : ''}`}
                  style={
                    isChosen
                      ? { background: 'var(--gold-pale)', borderColor: 'var(--gold)' }
                      : {}
                  }
                >
                  <span className="quiz-option-letter">{OPTION_LETTERS[idx]}</span>
                  <span>{option.replace(/^[A-D]\.\s*/, '')}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
            <button
              className="btn btn-outline btn-sm"
              onClick={handleExamPrev}
              disabled={questionIndex === 0}
            >
              ← Previous
            </button>
            <button
              className="btn btn-gold btn-sm"
              onClick={handleExamNext}
              disabled={questionIndex >= activeQuestions.length - 1}
            >
              Next →
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // ── Results Screen ────────────────────────────────────────
  if (screen === 'results' && resultData) {
    const { correct, total, pct, domainBreakdown, wrongAnswers } = resultData;
    const passed = pct >= 75;
    const scoreColor = pct >= 75 ? '#4C9B7B' : pct >= 60 ? '#9B7B4C' : '#9B4C4C';

    return (
      <motion.div initial="hidden" animate="visible">
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 40, textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 56px',
              background: 'var(--card)',
              borderRadius: 'var(--radius)',
              border: `2px solid ${scoreColor}`,
              boxShadow: 'var(--shadow)',
              marginBottom: 20,
            }}
          >
            <div className="score-ring-wrap">
              <ProgressRing
                percent={pct}
                size={140}
                stroke={12}
                label={`${pct}%`}
                sub={`${correct}/${total}`}
              />
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: scoreColor,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {passed ? 'PASS' : pct >= 60 ? 'ALMOST' : 'NEEDS WORK'}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 6 }}>
              {passed
                ? 'Great work! You are on track to pass the exam.'
                : pct >= 60
                ? 'Close! Review the weak areas below and try again.'
                : 'Keep studying. Focus on your weakest domains.'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                setScreen('select');
                setResults(null);
              }}
            >
              ↺ Try Again
            </button>
            <Link to="/" className="btn btn-gold">
              ◉ Go Home
            </Link>
          </div>
        </motion.div>

        {/* Domain breakdown */}
        <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Domain Breakdown</h2>
          <div className="card-flat">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  {['Domain', 'Questions', 'Correct', 'Score'].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--gold)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(domainBreakdown).sort(([a], [b]) => a - b).map(([dId, data]) => {
                  const dpct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                  const dcolor = dpct >= 75 ? '#4C9B7B' : dpct >= 60 ? '#9B7B4C' : '#9B4C4C';
                  return (
                    <tr key={dId} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 12px', fontSize: '0.875rem', fontWeight: 500 }}>
                        Domain {dId}: {domainNames[dId]}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {data.total}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '0.875rem', textAlign: 'center' }}>
                        {data.correct}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: dcolor }}>
                        {dpct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Wrong answers review */}
        {wrongAnswers.length > 0 && (
          <motion.div variants={fadeUp} custom={2} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>
              Review Wrong Answers
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  fontWeight: 400,
                  marginLeft: 10,
                }}
              >
                {wrongAnswers.length} incorrect
              </span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {wrongAnswers.map((a, i) => {
                const isOpen = openReview === i;
                return (
                  <div key={i} className="accordion-item">
                    <div
                      className="accordion-header"
                      onClick={() => setOpenReview(isOpen ? null : i)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && setOpenReview(isOpen ? null : i)}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          className="accordion-title"
                          style={{ fontSize: '0.9rem', fontWeight: 500 }}
                        >
                          {a.question.question.length > 100
                            ? a.question.question.slice(0, 100) + '…'
                            : a.question.question}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 3 }}>
                          Domain {a.question.domainId}
                        </div>
                      </div>
                      <span className={`accordion-chevron${isOpen ? ' open' : ''}`}>▾</span>
                    </div>
                    {isOpen && (
                      <div className="accordion-body" style={{ paddingTop: 16 }}>
                        <p style={{ fontWeight: 500, marginBottom: 14, lineHeight: 1.65 }}>
                          {a.question.question}
                        </p>
                        <div style={{ marginBottom: 14 }}>
                          {a.question.options.map((opt, oi) => (
                            <div
                              key={oi}
                              style={{
                                padding: '8px 12px',
                                marginBottom: 6,
                                borderRadius: 'var(--radius-sm)',
                                background:
                                  oi === a.question.answer
                                    ? '#E8F5EF'
                                    : oi === a.selectedIndex
                                    ? '#FDEDED'
                                    : 'transparent',
                                border: `1px solid ${
                                  oi === a.question.answer
                                    ? '#4C9B7B'
                                    : oi === a.selectedIndex
                                    ? '#9B4C4C'
                                    : 'var(--border)'
                                }`,
                                fontSize: '0.875rem',
                                display: 'flex',
                                gap: 10,
                                alignItems: 'flex-start',
                              }}
                            >
                              <span style={{ fontWeight: 700, minWidth: 20 }}>
                                {OPTION_LETTERS[oi]}.
                              </span>
                              <span>{opt.replace(/^[A-D]\.\s*/, '')}</span>
                              {oi === a.question.answer && (
                                <span style={{ marginLeft: 'auto', color: '#4C9B7B', fontWeight: 700, fontSize: '0.75rem' }}>
                                  ✓ Correct
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="callout callout-key">
                          <div className="callout-label">Explanation</div>
                          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>
                            {a.question.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Quiz history */}
        {quizHistory.length > 0 && (
          <motion.div variants={fadeUp} custom={3} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Your Recent Sessions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {quizHistory.map((h, i) => {
                const hpct = h.total > 0 ? Math.round((h.score / h.total) * 100) : 0;
                return (
                  <div
                    key={i}
                    className="card-flat"
                    style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
                  >
                    <div style={{ flex: 1, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(h.date).toLocaleDateString()} · {h.mode === 'exam' ? 'Exam Sim' : 'Practice'} ·{' '}
                      Domain {h.domain === 'all' ? 'All' : h.domain}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: hpct >= 75 ? '#4C9B7B' : hpct >= 60 ? '#9B7B4C' : '#9B4C4C',
                      }}
                    >
                      {h.score}/{h.total} ({hpct}%)
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 20,
                        background: hpct >= 75 ? 'var(--emerald-dim)' : 'var(--gold-dim)',
                        color: hpct >= 75 ? 'var(--emerald)' : 'var(--gold)',
                      }}
                    >
                      {hpct >= 75 ? 'PASS' : 'NEEDS WORK'}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return null;
}
