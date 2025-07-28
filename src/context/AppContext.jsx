import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const initialData = {
  user: {
    id: 'user-1',
    name: 'John Doe',
    coins: 10
  },
  module: {
    id: 'home-inspection-basics',
    title: 'Home Inspection Basics',
    description: 'Learn about home inspections for first-time buyers.',
    coinReward: 25,
    isCompleted: false,
    progress: 0,
    lessons: [
      {
        id: 'lesson-1',
        title: 'What is a Home Inspection?',
        content: `A home inspection is when a professional examines a house before you buy it. They check for problems you might not notice.

The inspector looks at:
• Structure and foundation
• Electrical systems  
• Plumbing
• Heating and cooling
• Roof condition
• Windows and doors

This helps you know what you're buying and can save you money later.`,
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
        title: 'Common Issues Found',
        content: `Home inspectors often find these common problems:

• Electrical issues (old wiring, overloaded circuits)
• Plumbing problems (leaks, old pipes)
• Roof issues (missing shingles, leaks)
• HVAC problems (old systems, poor maintenance)
• Foundation cracks
• Poor insulation

Most issues can be fixed, but it's good to know about them before buying.`,
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
        title: 'After the Inspection',
        content: `Once you get the inspection report, you have several options:

• Accept the house as-is
• Ask the seller to fix major issues
• Negotiate a lower price
• Walk away from the deal

Don't panic if problems are found - most houses have some issues. Focus on safety and expensive repairs.`,
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
  const [user, setUser] = useState(initialData.user);
  const [module, setModule] = useState(initialData.module);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const addCoins = (amount) => {
    setUser(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const nextLesson = () => {
    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const completeLesson = (lessonIndex) => {
    const updated = { ...module };
    updated.lessons[lessonIndex].isCompleted = true;

    const completed = updated.lessons.filter(l => l.isCompleted).length;
    updated.progress = (completed / updated.lessons.length) * 100;
    updated.isCompleted = completed === updated.lessons.length;

    setModule(updated);
  };

  const completeInteractiveElement = (lessonIndex) => {
    const updated = { ...module };
    updated.lessons[lessonIndex].interactiveElement.completed = true;
    setModule(updated);
  };

  const resetModule = () => {
    setModule(initialData.module);
    setCurrentLessonIndex(0);
  };

  const value = {
    user,
    currentModule: module,
    currentLessonIndex,
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
