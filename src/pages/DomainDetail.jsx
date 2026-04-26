import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import TopicAccordion from '../components/TopicAccordion';
import ProgressRing from '../components/ProgressRing';
import domains from '../data/domains';

const domainTextColors = ['d1-text', 'd2-text', 'd3-text', 'd4-text', 'd5-text'];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' } }),
};

export default function DomainDetail({ getTopicMastery, toggleMastery, getDomainProgress, getDomainStats }) {
  const { domainId } = useParams();
  const domain = domains.find(d => d.id === parseInt(domainId));
  const idx = domains.findIndex(d => d.id === parseInt(domainId));

  if (!domain) return <Navigate to="/domains" replace />;

  const progress = getDomainProgress(domain.id);
  const stats = getDomainStats(domain.id);
  const colorClass = domainTextColors[idx] || 'd1-text';

  return (
    <motion.div initial="hidden" animate="visible">
      <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 8 }}>
        <Link to="/domains" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          ← All Domains
        </Link>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start', marginBottom: 48 }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }} className={colorClass}>
            Domain {domain.id} · {domain.weight}% of exam
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', marginBottom: 14, lineHeight: 1.2 }}>
            {domain.name}
          </h1>
          <p style={{ fontSize: '1rem', maxWidth: 580, lineHeight: 1.7 }}>
            {domain.description}
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: domain.color }}>
                {stats.mastered}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mastered</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: domain.color }}>
                {stats.inProgress}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>In Progress</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                {stats.notStarted}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Not Started</div>
            </div>
          </div>
        </div>

        <ProgressRing
          percent={progress}
          size={130}
          stroke={11}
          label={`${progress}%`}
          sub="Mastery"
        />
      </motion.div>

      <motion.div variants={fadeUp} custom={2}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 20 }}>
          Topics & Objectives
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 10 }}>
            {domain.topics.length} topics
          </span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {domain.topics.map((topic, i) => (
            <motion.div key={topic.id} variants={fadeUp} custom={3 + i}>
              <TopicAccordion
                topic={topic}
                domainId={domain.id}
                masteryState={getTopicMastery(topic.id)}
                onToggle={toggleMastery}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
