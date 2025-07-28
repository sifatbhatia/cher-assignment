import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'home-learning-progress';

// Get progress from localStorage
const getStoredProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Save progress to localStorage  
const saveProgress = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Fail silently if localStorage unavailable
  }
};

const defaultState = {
  user: {
    name: 'John Doe',
    coins: 25
  },
  currentLessonIndex: 0,
  module: {
    id: 'home-inspection-basics',
    title: 'Home Inspection Basics',
    description: 'Essential knowledge for first-time home buyers',
    coinReward: 50,
    isCompleted: false,
    progress: 0,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Home Inspections',
        content: `A home inspection is your chance to really know what you're buying. Think of it as getting a professional second opinion before making the biggest purchase of your life.

The inspector will walk through the house and check all the major systems:
• Foundation and structure
• Electrical wiring and panels
• Plumbing and water systems  
• HVAC (heating and cooling)
• Roof and gutters
• Windows and doors

They're looking for safety issues, things that might break soon, or expensive problems you should know about. It usually takes 2-4 hours depending on the house size.

The inspector will give you a detailed report afterward, often with photos. This becomes your roadmap for negotiations with the seller or helps you plan future repairs.`,
        isCompleted: false,
        interactiveElement: {
          type: 'quiz',
          question: 'Who typically pays for a home inspection?',
          options: ['The seller', 'The buyer', 'The real estate agent', 'The bank'],
          correctAnswer: 1,
          explanation: 'The buyer usually pays for the home inspection since it protects their interests.',
          completed: false
        }
      },
      {
        id: 'lesson-2',
        title: 'Red Flags to Watch For',
        content: `Not all problems are deal-breakers, but some issues should make you think twice. Here are the big ones inspectors commonly find:

Electrical Problems:
• Old knob-and-tube wiring
• Overloaded circuits or panels
• Missing GFCI outlets in bathrooms/kitchens

Plumbing Issues:
• Galvanized steel pipes (prone to corrosion)
• Poor water pressure throughout house
• Signs of ongoing leaks

Structural Concerns:
• Foundation cracks wider than 1/4 inch
• Sagging floors or ceilings
• Evidence of termite damage

HVAC Red Flags: 
• Very old furnace or AC unit
• Ductwork problems
• Poor ventilation

Most of these can be fixed, but they're expensive. Use this info to negotiate or budget for repairs.`,
        isCompleted: false,
        interactiveElement: {
          type: 'diagram',
          question: 'Click on areas where inspectors commonly find problems.',
          explanation: 'Great job! These are the most common problem areas in homes.',
          completed: false
        }
      },
      {
        id: 'lesson-3',
        title: 'What Happens Next?',
        content: `Got the inspection report? Don't panic if it lists problems - every house has some issues. Here's how to handle it:

Review the Report:
Focus on safety issues and expensive repairs first. Cosmetic stuff can wait.

Your Options:
• Accept everything as-is (maybe negotiate price down)
• Ask seller to fix major issues before closing
• Request credits at closing to handle repairs yourself
• Walk away if problems are too severe

Negotiation Tips:
Get repair estimates for big items. This gives you real numbers to work with. Sellers often prefer giving credits over doing repairs themselves.

Final Inspection:
If seller agrees to fix things, do a final walkthrough before closing to make sure work was completed properly.

Remember: The inspection protects you. It's much better to know about problems now than discover them after you own the house.`,
        isCompleted: false,
        interactiveElement: {
          type: 'quiz',
          question: 'What should you do if major safety issues are found?',
          options: ['Ignore them', 'Ask seller to fix them', 'Buy anyway', 'Panic'],
          correctAnswer: 1,
          explanation: 'Major safety issues should always be addressed by the seller or through price negotiation.',
          completed: false
        }
      }
    ]
  }
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const stored = getStoredProgress();
    return stored || defaultState;
  });

  const [coinAnimation, setCoinAnimation] = useState({ show: false, amount: 0 });

  // Auto-save progress
  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const showCoins = (amount) => {
    setCoinAnimation({ show: true, amount });
    setTimeout(() => setCoinAnimation({ show: false, amount: 0 }), 2000);
  };

  const addCoins = (amount) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, coins: prev.user.coins + amount }
    }));
    showCoins(amount);
  };

  const nextLesson = () => {
    setState(prev => ({
      ...prev,
      currentLessonIndex: Math.min(
        prev.currentLessonIndex + 1,
        prev.module.lessons.length - 1
      )
    }));
  };

  const previousLesson = () => {
    setState(prev => ({
      ...prev,
      currentLessonIndex: Math.max(prev.currentLessonIndex - 1, 0)
    }));
  };

  const completeLesson = (lessonIndex) => {
    setState(prev => {
      const updatedLessons = [...prev.module.lessons];
      updatedLessons[lessonIndex] = { ...updatedLessons[lessonIndex], isCompleted: true };

      const completed = updatedLessons.filter(l => l.isCompleted).length;
      const progress = (completed / updatedLessons.length) * 100;

      return {
        ...prev,
        module: {
          ...prev.module,
          lessons: updatedLessons,
          progress,
          isCompleted: completed === updatedLessons.length
        }
      };
    });
  };

  const completeInteractiveElement = (lessonIndex) => {
    setState(prev => {
      const updatedLessons = [...prev.module.lessons];
      updatedLessons[lessonIndex] = {
        ...updatedLessons[lessonIndex],
        interactiveElement: {
          ...updatedLessons[lessonIndex].interactiveElement,
          completed: true
        }
      };

      return {
        ...prev,
        module: { ...prev.module, lessons: updatedLessons }
      };
    });
  };

  const resetModule = () => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user: state.user,
    currentModule: state.module,
    currentLessonIndex: state.currentLessonIndex,
    coinAnimation,
    addCoins,
    nextLesson,
    previousLesson,
    completeLesson,
    completeInteractiveElement,
    resetModule
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
