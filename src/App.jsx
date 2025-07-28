import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { AppProvider } from './context/AppContext.jsx';
import CompletionPage from './pages/CompletionPage';
import LessonPage from './pages/LessonPage';
import ModuleOverview from './pages/ModuleOverview';

function App() {
  const [currentView, setCurrentView] = useState('overview');

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
    <AppProvider>
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
      </div>
    </AppProvider>
  );
}

export default App;
