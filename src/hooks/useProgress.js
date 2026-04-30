import { useState, useCallback, useEffect } from 'react';
import domains from '../data/domains';

const STORAGE_KEY = 'sp_mastery';
const STREAK_KEY = 'sp_streak';
const STREAK_DATE_KEY = 'sp_streak_date';

function loadMastery() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveMastery(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // storage full or unavailable
  }
}

function loadStreak() {
  try {
    const streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
    const lastDate = localStorage.getItem(STREAK_DATE_KEY);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastDate === today) return streak;
    if (lastDate === yesterday) {
      // still active streak, update date
      localStorage.setItem(STREAK_DATE_KEY, today);
      localStorage.setItem(STREAK_KEY, String(streak + 1));
      return streak + 1;
    }
    // streak broken
    if (lastDate && lastDate !== today) {
      localStorage.setItem(STREAK_KEY, '1');
      localStorage.setItem(STREAK_DATE_KEY, today);
      return 1;
    }
    // first visit
    localStorage.setItem(STREAK_KEY, '1');
    localStorage.setItem(STREAK_DATE_KEY, today);
    return 1;
  } catch {
    return 0;
  }
}

export function useProgress() {
  const [masteryMap, setMasteryMap] = useState(loadMastery);
  const [streak] = useState(loadStreak);

  // ── Flashcard mastery ──────────────────────────────────────
  const [flashcardMastery, setFlashcardMasteryState] = useState(() => {
    try {
      const raw = localStorage.getItem('sp_fc_mastery');
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  const setFlashcardMastery = useCallback((cardId, status) => {
    setFlashcardMasteryState(prev => {
      const next = { ...prev, [cardId]: status };
      try { localStorage.setItem('sp_fc_mastery', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const getFlashcardStats = useCallback(() => {
    const vals = Object.values(flashcardMastery);
    return {
      total: vals.length,
      known: vals.filter(v => v === 'known').length,
      learning: vals.filter(v => v === 'learning').length,
    };
  }, [flashcardMastery]);

  // ── Quiz history ───────────────────────────────────────────
  const [quizHistory, setQuizHistoryState] = useState(() => {
    try {
      const raw = localStorage.getItem('sp_quiz_history');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  const saveQuizResult = useCallback((result) => {
    setQuizHistoryState(prev => {
      const next = [result, ...prev].slice(0, 5);
      try { localStorage.setItem('sp_quiz_history', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setMastery = useCallback((topicId, state) => {
    setMasteryMap(prev => {
      const next = { ...prev, [topicId]: state };
      saveMastery(next);
      return next;
    });
  }, []);

  const toggleMastery = useCallback((topicId) => {
    setMasteryMap(prev => {
      const current = prev[topicId] || 'notStarted';
      const next = {
        notStarted: 'inProgress',
        inProgress: 'mastered',
        mastered: 'notStarted',
      }[current];
      const updated = { ...prev, [topicId]: next };
      saveMastery(updated);
      return updated;
    });
  }, []);

  const getDomainProgress = useCallback((domainId) => {
    const domain = domains.find(d => d.id === domainId);
    if (!domain) return 0;
    const total = domain.topics.length;
    if (total === 0) return 0;
    const mastered = domain.topics.filter(t => masteryMap[t.id] === 'mastered').length;
    return Math.round((mastered / total) * 100);
  }, [masteryMap]);

  const getDomainStats = useCallback((domainId) => {
    const domain = domains.find(d => d.id === domainId);
    if (!domain) return { mastered: 0, inProgress: 0, notStarted: 0, total: 0 };
    const total = domain.topics.length;
    const mastered = domain.topics.filter(t => masteryMap[t.id] === 'mastered').length;
    const inProgress = domain.topics.filter(t => masteryMap[t.id] === 'inProgress').length;
    return { mastered, inProgress, notStarted: total - mastered - inProgress, total };
  }, [masteryMap]);

  const getGlobalProgress = useCallback(() => {
    const allTopics = domains.flatMap(d => d.topics);
    const total = allTopics.length;
    if (total === 0) return 0;
    const mastered = allTopics.filter(t => masteryMap[t.id] === 'mastered').length;
    return Math.round((mastered / total) * 100);
  }, [masteryMap]);

  const getTopicMastery = useCallback((topicId) => {
    return masteryMap[topicId] || 'notStarted';
  }, [masteryMap]);

  const resetAll = useCallback(() => {
    setMasteryMap({});
    saveMastery({});
  }, []);

  // ── Lab completion persistence ─────────────────────────────
  const LAB_KEY = 'sp_labs';

  const getLabCompletion = useCallback((labId) => {
    try {
      const stored = localStorage.getItem(LAB_KEY);
      if (!stored) return null;
      const data = JSON.parse(stored);
      return data[labId] || null;
    } catch {
      return null;
    }
  }, []);

  const setLabCompletion = useCallback((labId, { passed }) => {
    try {
      const stored = localStorage.getItem(LAB_KEY);
      const data = stored ? JSON.parse(stored) : {};
      const existing = data[labId] || { attempts: 0 };
      data[labId] = {
        passed: passed || existing.passed || false,
        attempts: existing.attempts + 1,
        lastAttempt: new Date().toISOString(),
      };
      localStorage.setItem(LAB_KEY, JSON.stringify(data));
    } catch {
      // silent fail
    }
  }, []);

  const getLabStats = useCallback(() => {
    try {
      const stored = localStorage.getItem(LAB_KEY);
      if (!stored) return { total: 30, passed: 0, attempted: 0 };
      const data = JSON.parse(stored);
      const entries = Object.values(data);
      return {
        total: 30,
        passed: entries.filter(e => e.passed).length,
        attempted: entries.filter(e => e.attempts > 0).length,
      };
    } catch {
      return { total: 30, passed: 0, attempted: 0 };
    }
  }, []);

  return {
    masteryMap,
    setMastery,
    toggleMastery,
    getDomainProgress,
    getDomainStats,
    getGlobalProgress,
    getTopicMastery,
    streak,
    resetAll,
    flashcardMastery,
    setFlashcardMastery,
    getFlashcardStats,
    quizHistory,
    saveQuizResult,
    getLabCompletion,
    setLabCompletion,
    getLabStats,
  };
}
