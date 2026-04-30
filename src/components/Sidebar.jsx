import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import domains from '../data/domains';

const domainColors = ['d1-color', 'd2-color', 'd3-color', 'd4-color', 'd5-color'];

/* ── Tiny inline SVG helper ────────────────────────────────────── */
function Icon({ d, size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {Array.isArray(d)
        ? d.map((seg, i) => <path key={i} d={seg} />)
        : <path d={d} />}
    </svg>
  );
}

/* ── Path data for each nav icon ───────────────────────────────── */
const NAV_ICONS = {
  '/': [
    'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    'M9 22V12h6v10',
  ],
  '/domains':
    'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  '/flashcards': [
    'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z',
    'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
  ],
  '/labs': [
    'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18',
  ],
  '/quiz': [
    'M9 11l3 3L22 4',
    'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  ],
  '/glossary': [
    'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  ],
  '/exam-tips':
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
};

const SUN_ICON = [
  'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
  'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
];
const MOON_ICON = 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z';

/* ── Component ─────────────────────────────────────────────────── */
export default function Sidebar({ progress }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme — read the live <html data-theme> attribute as initial value
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cipher-theme', next);
  };

  // Stay in sync if another tab or the inline script changes the attribute
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const val = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(val);
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => obs.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const links = [
    { to: '/',           label: 'Dashboard'     },
    { to: '/domains',    label: 'Domains'       },
    { to: '/flashcards', label: 'Flashcards'    },
    { to: '/labs',       label: 'Labs'          },
    { to: '/quiz',       label: 'Practice Quiz' },
    { to: '/glossary',   label: 'Glossary'      },
    { to: '/exam-tips',  label: 'Exam Tips'     },
  ];

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen
          ? <Icon d="M18 6L6 18M6 6l12 12" size={20} />
          : <Icon d={['M3 12h18', 'M3 6h18', 'M3 18h18']} size={20} />}
      </button>

      <div
        className={`sidebar-overlay${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`sidebar${menuOpen ? ' open' : ''}`}>

        {/* Wordmark */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-eyebrow">CompTIA</div>
          <h2>Security+</h2>
          <div className="sidebar-logo-sub">SY0-701 Study Guide</div>
        </div>

        {/* Overall Mastery */}
        <div className="sidebar-progress">
          <div className="sidebar-progress-label">
            <span>Overall Mastery</span>
            <span>{progress}%</span>
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
              onClick={() => setMenuOpen(false)}
            >
              <span className="link-icon">
                <Icon d={NAV_ICONS[link.to]} />
              </span>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Domain quick links */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Domains</div>
          {domains.map((domain, idx) => (
            <NavLink
              key={domain.id}
              to={`/domains/${domain.id}`}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={`sidebar-domain-dot ${domainColors[idx]}`} />
              <span style={{ flex: 1, fontSize: '0.825rem' }}>
                D{domain.id} · {domain.name.split(' ').slice(0, 2).join(' ')}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Theme toggle — pinned to sidebar bottom */}
        <div className="sidebar-theme-toggle">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon d={isDark ? SUN_ICON : MOON_ICON} size={15} />
            <span style={{ flex: 1, textAlign: 'left' }}>
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
            <span className="theme-toggle-badge">
              {isDark ? '☀' : '🌙'}
            </span>
          </button>
        </div>

      </aside>
    </>
  );
}
