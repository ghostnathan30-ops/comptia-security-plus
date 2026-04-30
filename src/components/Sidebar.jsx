import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import domains from '../data/domains';

const domainColors = ['d1-color', 'd2-color', 'd3-color', 'd4-color', 'd5-color'];

export default function Sidebar({ progress }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', icon: '◉', label: 'Dashboard' },
    { to: '/domains', icon: '▦', label: 'Domains' },
    { to: '/flashcards', icon: '⬛', label: 'Flashcards' },
    { to: '/labs', icon: '⚗', label: 'Labs' },
    { to: '/quiz', icon: '✎', label: 'Practice Quiz' },
    { to: '/glossary', icon: '◈', label: 'Glossary' },
    { to: '/exam-tips', icon: '★', label: 'Exam Tips' },
  ];

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {open ? '✕' : '☰'}
      </button>

      <div
        className={`sidebar-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo">
          <div style={{ marginBottom: 6 }}>
            <span>CompTIA</span>
          </div>
          <h2>Security+</h2>
          <div style={{ marginTop: 4, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            SY0-701 Study Guide
          </div>
        </div>

        {/* Global progress bar */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Overall Mastery
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold)' }}>
              {progress}%
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Main navigation */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Navigation</div>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="link-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Domain quick links */}
        <div className="sidebar-section" style={{ marginTop: 8 }}>
          <div className="sidebar-section-label">Domains</div>
          {domains.map((domain, idx) => (
            <NavLink
              key={domain.id}
              to={`/domains/${domain.id}`}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className={`sidebar-domain-dot ${domainColors[idx]}`} />
              <span style={{ flex: 1, fontSize: '0.825rem' }}>
                D{domain.id} · {domain.name.split(' ').slice(0, 2).join(' ')}
              </span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
