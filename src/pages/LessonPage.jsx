import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DiagramComponent from '../components/DiagramComponent';
import ProgressBar from '../components/ProgressBar';
import QuizComponent from '../components/QuizComponent';
import Button from '../components/SimpleButton';
import { useAppContext } from '../context/AppContext';

const LessonPage = ({ onBackToOverview, onComplete }) => {
   const {
      currentModule,
      currentLessonIndex,
      nextLesson,
      previousLesson,
      completeLesson,
      completeInteractiveElement,
      addCoins
   } = useAppContext();

   const [showInteractive, setShowInteractive] = useState(false);
   const [hasReadContent, setHasReadContent] = useState(false);
   const [interactiveCompleted, setInteractiveCompleted] = useState(false);

   const lesson = currentModule?.lessons[currentLessonIndex];

   useEffect(() => {
      if (lesson) {
         setShowInteractive(false);
         setHasReadContent(false);
         setInteractiveCompleted(lesson.interactiveElement.completed);
      }
   }, [currentLessonIndex, lesson]);

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }, [currentLessonIndex]);

   if (!currentModule || !lesson) {
      return <div>No lesson found</div>;
   }

   const handleMarkAsRead = () => {
      setHasReadContent(true);
      setShowInteractive(true);
   };

   const handleInteractiveComplete = () => {
      setInteractiveCompleted(true);
      completeInteractiveElement(currentLessonIndex);

      const coinReward = lesson.interactiveElement.type === 'diagram' ? 8 : 5;
      addCoins(coinReward);
   };

   const handleLessonComplete = () => {
      completeLesson(currentLessonIndex);
      addCoins(10);

      if (currentLessonIndex === currentModule.lessons.length - 1) {
         addCoins(currentModule.coinReward);
         setTimeout(() => {
            onComplete();
         }, 1000);
      }
   };

   const canCompleteLesson = hasReadContent && interactiveCompleted;
   const isLastLesson = currentLessonIndex === currentModule.lessons.length - 1;
   const totalLessons = currentModule.lessons.length;

   const renderInteractiveElement = () => {
      switch (lesson.interactiveElement.type) {
         case 'quiz':
         case 'knowledge-check':
            return (
               <QuizComponent
                  element={lesson.interactiveElement}
                  onComplete={handleInteractiveComplete}
               />
            );
         case 'diagram':
            return (
               <DiagramComponent
                  element={lesson.interactiveElement}
                  onComplete={handleInteractiveComplete}
               />
            );
         default:
            return null;
      }
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <div className="flex items-center justify-between">
                  <button
                     onClick={onBackToOverview}
                     className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                     <ArrowLeft className="w-5 h-5 mr-2" />
                     Back to Overview
                  </button>

                  <div className="flex items-center space-x-4">
                     <span className="text-sm text-gray-500">
                        Lesson {currentLessonIndex + 1} of {totalLessons}
                     </span>
                     <div className="w-32">
                        <ProgressBar
                           progress={((currentLessonIndex + 1) / totalLessons) * 100}
                           size="sm"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Lesson Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                     <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">
                        {lesson.title}
                     </h1>
                     <p className="text-gray-600">
                        Lesson {currentLessonIndex + 1} • Estimated reading time: 5 minutes
                     </p>
                  </div>
               </div>
            </motion.div>

            {/* Lesson Content */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="card mb-8"
            >
               <div className="prose prose-lg max-w-none">
                  {currentLesson.content.split('\n\n').map((paragraph, index) => {
                     if (paragraph.includes('•')) {
                        const lines = paragraph.split('\n');
                        const listItems = lines.filter(line => line.trim().startsWith('•'));
                        const nonListContent = lines.filter(line => !line.trim().startsWith('•') && line.trim() !== '');

                        return (
                           <div key={index}>
                              {nonListContent.map((line, lineIndex) => (
                                 <p key={lineIndex} className="text-gray-700 leading-relaxed mb-4">
                                    {line.trim()}
                                 </p>
                              ))}

                              {listItems.length > 0 && (
                                 <ul className="list-disc list-inside space-y-2 my-4 ml-4">
                                    {listItems.map((item, itemIndex) => (
                                       <li key={itemIndex} className="text-gray-700">
                                          {item.replace('•', '').trim()}
                                       </li>
                                    ))}
                                 </ul>
                              )}
                           </div>
                        );
                     }

                     if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                           <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                              {paragraph.replace(/\*\*/g, '')}
                           </h3>
                        );
                     }

                     return (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                           {paragraph}
                        </p>
                     );
                  })}
               </div>

               {!hasReadContent && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                     <Button onClick={handleMarkAsRead} className="w-full">
                        I've finished reading this lesson
                     </Button>
                  </div>
               )}
            </motion.div>

            {/* Interactive Element */}
            <AnimatePresence>
               {showInteractive && !interactiveCompleted && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ delay: 0.2 }}
                     className="mb-8"
                  >
                     {renderInteractiveElement()}
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Completion Status */}
            {interactiveCompleted && (
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card mb-8 bg-green-50 border-green-200"
               >
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h3 className="font-semibold text-green-800">
                           Interactive element completed!
                        </h3>
                        <p className="text-green-700 text-sm">
                           Great job! You can now mark this lesson as complete.
                        </p>
                     </div>
                  </div>
               </motion.div>
            )}

            {/* Navigation */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="flex flex-col sm:flex-row gap-4"
            >
               <div className="flex space-x-4">
                  {currentLessonIndex > 0 && (
                     <Button
                        variant="secondary"
                        onClick={previousLesson}
                     >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous Lesson
                     </Button>
                  )}
               </div>

               <div className="flex-1"></div>

               <div className="flex space-x-4">
                  {canCompleteLesson && !currentLesson.isCompleted && (
                     <Button
                        onClick={handleLessonComplete}
                        className="bg-green-600 hover:bg-green-700"
                     >
                        <Check className="w-4 h-4 mr-2" />
                        Complete Lesson
                     </Button>
                  )}

                  {currentLesson.isCompleted && !isLastLesson && (
                     <Button onClick={nextLesson}>
                        Next Lesson
                        <ArrowRight className="w-4 h-4 ml-2" />
                     </Button>
                  )}

                  {currentLesson.isCompleted && isLastLesson && (
                     <Button
                        onClick={onComplete}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                     >
                        Complete Module
                        <Check className="w-4 h-4 ml-2" />
                     </Button>
                  )}
               </div>
            </motion.div>

            {/* Progress Indicator */}
            <div className="mt-12 text-center">
               <div className="inline-flex space-x-2">
                  {currentModule.lessons.map((lesson, index) => (
                     <div
                        key={lesson.id}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${lesson.isCompleted
                           ? 'bg-green-500'
                           : index === currentLessonIndex
                              ? 'bg-primary-500'
                              : 'bg-gray-300'
                           }`}
                     />
                  ))}
               </div>
               <p className="text-sm text-gray-500 mt-2">
                  {currentModule.lessons.filter(l => l.isCompleted).length} of {totalLessons} lessons completed
               </p>
            </div>
         </div>
      </div>
   );
};

export default LessonPage;
