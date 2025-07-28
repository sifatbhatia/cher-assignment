import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './App.css';
import CoinAnimation from './components/CoinAnimation';
import Header from './components/Header';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import CompletionPage from './pages/CompletionPage';
import LessonPage from './pages/LessonPage';
import ModuleOverview from './pages/ModuleOverview';

function AppContent() {
  const [currentView, setCurrentView] = useState('overview');
  const { coinAnimation } = useAppContext();

  const handleStartModule = () => {
    setCurrentView('lesson');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
  };

  const handleModuleComplete = () => {
    setCurrentView('completion');
  };

  const handleResetModule = () => {
    setCurrentView('overview');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <AnimatePresence mode="wait">
        {currentView === 'overview' && (
          <ModuleOverview
            key="overview"
            onStartModule={handleStartModule}
          />
        )}

        {currentView === 'lesson' && (
          <LessonPage
            key="lesson"
            onBackToOverview={handleBackToOverview}
            onComplete={handleModuleComplete}
          />
        )}

        {currentView === 'completion' && (
          <CompletionPage
            key="completion"
            onBackToOverview={handleBackToOverview}
            onResetModule={handleResetModule}
          />
        )}
      </AnimatePresence>

      <CoinAnimation
        amount={coinAnimation.amount}
        isVisible={coinAnimation.show}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
