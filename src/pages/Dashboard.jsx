import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProgressRing from '../components/ProgressRing';
import DomainCard from '../components/DomainCard';
import domains from '../data/domains';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' } }),
};

export default function Dashboard({ progress, getDomainProgress, streak }) {
  const globalProgress = progress;

  return (
    <motion.div initial="hidden" animate="visible">
      {/* Hero header */}
      <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 48 }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
          CompTIA Security+ SY0-701
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.75rem', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
          Your Study Dashboard
        </h1>
        <p style={{ maxWidth: 560, fontSize: '1.05rem' }}>
          Track your mastery across all five Security+ domains. Study thoroughly, practice consistently, and earn your certification.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={fadeUp}
        custom={1}
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr 1fr 1fr',
          gap: 24,
          marginBottom: 48,
          alignItems: 'center',
        }}
        className="dashboard-stats"
      >
        {/* Progress ring */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 40px' }}>
          <ProgressRing
            percent={globalProgress}
            size={140}
            stroke={12}
            label={`${globalProgress}%`}
            sub="Overall Mastery"
          />
        </div>

        {/* Quick stats */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>
            {domains.reduce((acc, d) => acc + d.topics.length, 0)}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total Topics</div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>
            300
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Flashcards</div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '1.5rem' }}>🔥</span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)' }}>
              {streak}
            </div>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Day Streak</div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={fadeUp} custom={2} style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/domains" className="btn btn-gold btn-lg">▦ Study Domains</Link>
          <Link to="/flashcards" className="btn btn-outline btn-lg">⬛ Flashcards</Link>
          <Link to="/quiz" className="btn btn-outline btn-lg">✎ Practice Quiz</Link>
          <Link to="/glossary" className="btn btn-outline btn-lg">◈ Glossary</Link>
        </div>
      </motion.div>

      <hr className="divider" />

      {/* Domain cards */}
      <motion.div variants={fadeUp} custom={3} style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Domain Progress</h2>
        <p style={{ marginBottom: 28 }}>
          Security+ SY0-701 is divided into five domains. Click any domain to begin studying.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {domains.map((domain, idx) => (
          <motion.div key={domain.id} variants={fadeUp} custom={4 + idx}>
            <DomainCard
              domain={domain}
              progress={getDomainProgress(domain.id)}
              idx={idx}
            />
          </motion.div>
        ))}
      </div>

      {/* Exam info */}
      <motion.div variants={fadeUp} custom={9} style={{ marginTop: 48 }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #FDFAF5 0%, #FAF4E8 100%)' }}>
          <h3 style={{ marginBottom: 16 }}>About the Exam</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { label: 'Exam Code', value: 'SY0-701' },
              { label: 'Questions', value: 'Max 90' },
              { label: 'Duration', value: '90 Minutes' },
              { label: 'Passing Score', value: '750 / 900' },
              { label: 'Format', value: 'MCQ + PBQ' },
              { label: 'Valid For', value: '3 Years' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '1rem' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
