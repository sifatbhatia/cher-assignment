import { motion } from 'framer-motion';
import { Award, Coins, Home, RotateCcw } from 'lucide-react';
import React, { useEffect } from 'react';
import Button from '../components/SimpleButton';
import { useAppContext } from '../context/AppContext';
import { formatCoins } from '../utils';

const CompletionPage = ({ onBackToOverview, onResetModule }) => {
   const { currentModule, user, resetModule } = useAppContext();

   const handleResetModule = () => {
      resetModule();
      onResetModule();
   };

   if (!currentModule) {
      return <div>No module data available</div>;
   }

   const totalLessons = currentModule.lessons.length;
   const completedLessons = currentModule.lessons.filter(lesson => lesson.isCompleted).length;

   return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

            {/* Main Celebration Card */}
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="text-center mb-12"
            >
               <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
               >
                  <Award className="w-12 h-12 text-white" />
               </motion.div>

               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl font-bold text-gray-900 mb-4"
               >
                  🎉 Congratulations!
               </motion.h1>

               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl text-gray-600 mb-2"
               >
                  You've completed
               </motion.p>

               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl font-bold text-primary-600 mb-8"
               >
                  {currentModule.title}
               </motion.h2>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="card text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
               >
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                     <span className="text-white font-bold text-lg">{completedLessons}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     Lessons Completed
                  </h3>
                  <p className="text-blue-600 font-medium">
                     {completedLessons}/{totalLessons} finished
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="card text-center bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
               >
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                     <Coins className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     Coins Earned
                  </h3>
                  <p className="text-yellow-600 font-medium">
                     +{formatCoins(currentModule.coinReward)} coins
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="card text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
               >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                     <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                     Progress
                  </h3>
                  <p className="text-green-600 font-medium">
                     100% Complete
                  </p>
               </motion.div>
            </div>

            {/* Achievement Details */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.0 }}
               className="card mb-12 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
            >
               <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                     🏆 New Achievement Unlocked!
                  </h3>
                  <div className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-xl font-medium mb-4">
                     <Award className="w-5 h-5 mr-2" />
                     Home Inspection Fundamentals Expert
                  </div>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                     You now have the essential knowledge to understand home inspections,
                     identify common issues, and make informed decisions when buying your first home.
                     This knowledge will serve you well throughout your home-buying journey!
                  </p>
               </div>
            </motion.div>

            {/* Current Coin Balance */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.1 }}
               className="card mb-12 text-center bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
            >
               <div className="flex items-center justify-center space-x-3 mb-4">
                  <Coins className="w-8 h-8 text-amber-600" />
                  <span className="text-3xl font-bold text-amber-700">
                     {formatCoins(user.coins)}
                  </span>
               </div>
               <p className="text-amber-700 font-medium">
                  Total coins in your wallet
               </p>
               <p className="text-sm text-amber-600 mt-2">
                  Use coins to unlock new modules and exclusive content!
               </p>
            </motion.div>

            {/* What's Next */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2 }}
               className="card mb-12"
            >
               <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  What's Next?
               </h3>
               <p className="text-center text-gray-600">
                  Apply what you've learned when viewing properties and working with inspectors.
               </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.3 }}
               className="flex flex-col sm:flex-row gap-4 justify-center"
            >
               <Button
                  onClick={onBackToOverview}
                  variant="primary"
                  size="lg"
               >
                  <Home className="w-5 h-5 mr-2" />
                  Return to Overview
               </Button>

               <Button
                  onClick={handleResetModule}
                  variant="outline"
                  size="lg"
               >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retake Module
               </Button>
            </motion.div>
         </div>
      </div>
   );
};

export default CompletionPage;
