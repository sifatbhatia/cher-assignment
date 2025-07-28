import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, Play } from 'lucide-react';
import React from 'react';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/SimpleButton';
import { useAppContext } from '../context/AppContext.jsx';
import { calculateTimeToComplete, formatCoins } from '../utils';

const ModuleOverview = ({ onStartModule }) => {
   const { currentModule } = useAppContext();

   if (!currentModule) {
      return <div>No module available</div>;
   }

   const completedLessons = currentModule.lessons.filter(lesson => lesson.isCompleted).length;
   const totalLessons = currentModule.lessons.length;
   const timeToComplete = calculateTimeToComplete(totalLessons, completedLessons);

   return (
      <div className="min-h-screen bg-gray-50 py-8">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center mb-12"
            >
               <div className="mb-6">
                  <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                     {currentModule.title}
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                     {currentModule.description}
                  </p>
               </div>
            </motion.div>

            {/* Progress Card */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="card mb-8"
            >
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
                  <div className="text-right">
                     <p className="text-3xl font-bold text-primary-600">
                        {completedLessons}/{totalLessons}
                     </p>
                     <p className="text-sm text-gray-500">lessons completed</p>
                  </div>
               </div>

               <ProgressBar
                  progress={currentModule.progress}
                  showLabel={true}
                  size="lg"
                  className="mb-4"
               />

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                     <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                     <p className="text-sm font-medium text-gray-900">{timeToComplete}</p>
                     <p className="text-xs text-gray-500">time remaining</p>
                  </div>

                  <div className="text-center p-4 bg-accent-50 rounded-lg">
                     <Award className="w-6 h-6 text-accent-600 mx-auto mb-2" />
                     <p className="text-sm font-medium text-accent-900">
                        {formatCoins(currentModule.coinReward)} coins
                     </p>
                     <p className="text-xs text-accent-600">potential reward</p>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                     <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
                     <p className="text-sm font-medium text-green-900">{totalLessons} lessons</p>
                     <p className="text-xs text-green-600">in this module</p>
                  </div>
               </div>
            </motion.div>

            {/* Lessons Overview */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="card mb-8"
            >
               <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>

               <div className="space-y-4">
                  {currentModule.lessons.map((lesson, index) => (
                     <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${lesson.isCompleted
                           ? 'border-green-200 bg-green-50'
                           : 'border-gray-200 bg-white hover:border-gray-300'
                           }`}
                     >
                        <div className="flex items-center space-x-4">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${lesson.isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                              }`}>
                              {lesson.isCompleted ? '✓' : index + 1}
                           </div>

                           <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                 {lesson.title}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                 {lesson.content.substring(0, 120)}...
                              </p>
                           </div>

                           <div className="text-right">
                              <p className="text-xs text-gray-500">~5 min</p>
                              {lesson.isCompleted && (
                                 <p className="text-xs text-green-600 font-medium">Complete</p>
                              )}
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </motion.div>

            {/* Action Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="text-center"
            >
               {currentModule.isCompleted ? (
                  <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                     <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-800 mb-2">
                           Module Completed!
                        </h3>
                        <p className="text-green-700 mb-4">
                           Congratulations! You've mastered the fundamentals of home inspections.
                        </p>
                        <div className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-medium">
                           <Award className="w-5 h-5 mr-2" />
                           {formatCoins(currentModule.coinReward)} coins earned!
                        </div>
                     </div>
                  </div>
               ) : (
                  <Button
                     onClick={onStartModule}
                     size="lg"
                     className="px-12 py-4"
                  >
                     <Play className="w-5 h-5 mr-2" />
                     {completedLessons > 0 ? 'Continue Module' : 'Start Module'}
                  </Button>
               )}
            </motion.div>

            {/* Tips */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200"
            >
               <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Tips
               </h3>
               <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Take your time with each lesson</li>
                  <li>• Complete the interactive parts</li>
                  <li>• Progress saves automatically</li>
               </ul>
            </motion.div>
         </div>
      </div>
   );
};

export default ModuleOverview;
