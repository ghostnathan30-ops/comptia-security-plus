import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useProgress } from './hooks/useProgress';

import Dashboard from './pages/Dashboard';
import DomainsOverview from './pages/DomainsOverview';
import DomainDetail from './pages/DomainDetail';
import TopicDeepDive from './pages/TopicDeepDive';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Glossary from './pages/Glossary';
import ExamTips from './pages/ExamTips';
import Labs from './pages/Labs';

export default function App() {
  const {
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
  } = useProgress();

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar progress={getGlobalProgress()} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  progress={getGlobalProgress()}
                  getDomainProgress={getDomainProgress}
                  streak={streak}
                />
              }
            />
            <Route
              path="/domains"
              element={
                <DomainsOverview
                  getDomainProgress={getDomainProgress}
                />
              }
            />
            <Route
              path="/domains/:domainId"
              element={
                <DomainDetail
                  getTopicMastery={getTopicMastery}
                  toggleMastery={toggleMastery}
                  getDomainProgress={getDomainProgress}
                  getDomainStats={getDomainStats}
                />
              }
            />
            <Route
              path="/domains/:domainId/:topicId"
              element={
                <TopicDeepDive
                  getTopicMastery={getTopicMastery}
                  setMastery={setMastery}
                />
              }
            />
            <Route
              path="/flashcards"
              element={
                <Flashcards
                  flashcardMastery={flashcardMastery}
                  setFlashcardMastery={setFlashcardMastery}
                  getFlashcardStats={getFlashcardStats}
                />
              }
            />
            <Route
              path="/quiz"
              element={
                <Quiz
                  saveQuizResult={saveQuizResult}
                  quizHistory={quizHistory}
                />
              }
            />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/exam-tips" element={<ExamTips />} />
            <Route
              path="/labs"
              element={
                <Labs
                  getLabCompletion={getLabCompletion}
                  setLabCompletion={setLabCompletion}
                  getLabStats={getLabStats}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
