import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import DomainCard from '../components/DomainCard';
import domains from '../data/domains';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4, ease: 'easeOut' } }),
};

export default function DomainsOverview({ getDomainProgress }) {
  return (
    <motion.div initial="hidden" animate="visible">
      <motion.div variants={fadeUp} custom={0}>
        <PageHeader
          eyebrow="SY0-701 Curriculum"
          title="All Domains"
          description="The Security+ exam covers five domains. Each domain contains multiple objectives and topics. Master all five to achieve certification."
        />
      </motion.div>

      {/* Exam weight summary */}
      <motion.div variants={fadeUp} custom={1} style={{ marginBottom: 40 }}>
        <div className="card-flat" style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
          {domains.map((domain, idx) => (
            <div
              key={domain.id}
              style={{
                flex: `${domain.weight}`,
                height: 12,
                background: domain.color,
                borderRadius: idx === 0 ? '10px 0 0 10px' : idx === domains.length - 1 ? '0 10px 10px 0' : 0,
                position: 'relative',
                minWidth: 20,
              }}
              title={`Domain ${domain.id}: ${domain.weight}%`}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
          {domains.map((domain) => (
            <div key={domain.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: domain.color }} />
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                D{domain.id}: {domain.weight}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {domains.map((domain, idx) => (
          <motion.div key={domain.id} variants={fadeUp} custom={2 + idx}>
            <DomainCard
              domain={domain}
              progress={getDomainProgress(domain.id)}
              idx={idx}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
