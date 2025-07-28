import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import Button from './SimpleButton';

const DiagramComponent = ({ element, onComplete }) => {
   const [clickedAreas, setClickedAreas] = useState(new Set());
   const [showResult, setShowResult] = useState(false);
   const [showHints, setShowHints] = useState(false);

   const targetAreas = ['roof', 'foundation', 'electrical', 'plumbing'];
   const completionThreshold = 3; // Need to click at least 3 areas

   const handleAreaClick = (areaId) => {
      if (showResult) return;

      const newClickedAreas = new Set(clickedAreas);
      if (clickedAreas.has(areaId)) {
         newClickedAreas.delete(areaId);
      } else {
         newClickedAreas.add(areaId);
      }
      setClickedAreas(newClickedAreas);
   };

   const handleSubmit = () => {
      setShowResult(true);
      setTimeout(() => {
         onComplete();
      }, 3000);
   };

   const isAreaCorrect = (areaId) => {
      return targetAreas.includes(areaId);
   };

   const canSubmit = clickedAreas.size >= completionThreshold;

   return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
         <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
               Interactive Home Diagram
            </h3>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
               {element.question}
            </p>
            <p className="text-sm text-gray-600">
               Click on at least {completionThreshold} areas where inspectors commonly find issues.
            </p>
         </div>

         {/* Simple House Diagram */}
         <div className="relative bg-white rounded-lg p-8 mb-6 border border-gray-200">
            <svg
               viewBox="0 0 400 300"
               className="w-full h-auto max-w-md mx-auto"
               style={{ maxHeight: '300px' }}
            >
               {/* House Structure */}
               {/* Roof */}
               <motion.polygon
                  points="50,120 200,40 350,120 320,120 200,60 80,120"
                  fill={clickedAreas.has('roof') ? (showResult && isAreaCorrect('roof') ? '#10b981' : '#3b82f6') : '#e5e7eb'}
                  stroke="#374151"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-200"
                  whileHover={{ fill: showResult ? undefined : '#d1d5db' }}
                  onClick={() => handleAreaClick('roof')}
               />

               {/* Main House */}
               <rect
                  x="80"
                  y="120"
                  width="240"
                  height="140"
                  fill="#f3f4f6"
                  stroke="#374151"
                  strokeWidth="2"
               />

               {/* Foundation */}
               <motion.rect
                  x="70"
                  y="250"
                  width="260"
                  height="20"
                  fill={clickedAreas.has('foundation') ? (showResult && isAreaCorrect('foundation') ? '#10b981' : '#3b82f6') : '#6b7280'}
                  stroke="#374151"
                  strokeWidth="2"
                  className="cursor-pointer transition-colors duration-200"
                  whileHover={{ fill: showResult ? undefined : '#9ca3af' }}
                  onClick={() => handleAreaClick('foundation')}
               />

               {/* Windows */}
               <rect x="110" y="150" width="30" height="30" fill="#bfdbfe" stroke="#374151" strokeWidth="1" />
               <rect x="260" y="150" width="30" height="30" fill="#bfdbfe" stroke="#374151" strokeWidth="1" />

               {/* Door */}
               <rect x="180" y="200" width="40" height="60" fill="#92400e" stroke="#374151" strokeWidth="1" />

               {/* Electrical Panel */}
               <motion.rect
                  x="300"
                  y="190"
                  width="15"
                  height="25"
                  fill={clickedAreas.has('electrical') ? (showResult && isAreaCorrect('electrical') ? '#10b981' : '#3b82f6') : '#fbbf24'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer transition-colors duration-200"
                  whileHover={{ fill: showResult ? undefined : '#f59e0b' }}
                  onClick={() => handleAreaClick('electrical')}
               />

               {/* Plumbing (pipes) */}
               <motion.line
                  x1="90"
                  y1="180"
                  x2="90"
                  y2="250"
                  stroke={clickedAreas.has('plumbing') ? (showResult && isAreaCorrect('plumbing') ? '#10b981' : '#3b82f6') : '#6366f1'}
                  strokeWidth="4"
                  className="cursor-pointer"
                  onClick={() => handleAreaClick('plumbing')}
               />

               {/* HVAC Unit */}
               <motion.rect
                  x="340"
                  y="130"
                  width="25"
                  height="20"
                  fill={clickedAreas.has('hvac') ? (showResult && isAreaCorrect('hvac') ? '#10b981' : '#3b82f6') : '#8b5cf6'}
                  stroke="#374151"
                  strokeWidth="1"
                  className="cursor-pointer transition-colors duration-200"
                  whileHover={{ fill: showResult ? undefined : '#a78bfa' }}
                  onClick={() => handleAreaClick('hvac')}
               />

               {/* Windows frames */}
               <motion.rect
                  x="140"
                  y="140"
                  width="50"
                  height="40"
                  fill="transparent"
                  stroke={clickedAreas.has('windows') ? (showResult && isAreaCorrect('windows') ? '#10b981' : '#3b82f6') : 'transparent'}
                  strokeWidth="3"
                  className="cursor-pointer"
                  onClick={() => handleAreaClick('windows')}
               />
            </svg>

            {/* Labels */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  <span>Roof</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>Electrical Panel</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded"></div>
                  <span>Foundation</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                  <span>Plumbing</span>
               </div>
            </div>
         </div>

         {/* Progress indicator */}
         <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-medium text-gray-700">
                  Areas selected: {clickedAreas.size}/{targetAreas.length}
               </span>
               <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-sm text-blue-600 hover:text-blue-800"
               >
                  {showHints ? 'Hide hints' : 'Show hints'}
               </button>
            </div>

            <div className="flex space-x-1">
               {[...Array(targetAreas.length)].map((_, index) => (
                  <div
                     key={index}
                     className={`h-2 flex-1 rounded ${index < clickedAreas.size ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                  />
               ))}
            </div>
         </div>

         <AnimatePresence>
            {showHints && (
               <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
               >
                  <p className="text-sm text-blue-800 mb-2 font-medium">Hint:</p>
                  <p className="text-sm text-blue-700">
                     Look for structural elements, utility systems, and areas where water or electrical issues commonly occur.
                  </p>
               </motion.div>
            )}
         </AnimatePresence>

         <AnimatePresence>
            {showResult && (
               <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200"
               >
                  <div className="flex items-start space-x-3">
                     <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                     <div>
                        <p className="text-sm font-medium text-green-800 mb-1">
                           Excellent work!
                        </p>
                        <p className="text-sm text-green-700">{element.explanation}</p>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {!showResult && (
            <Button
               onClick={handleSubmit}
               disabled={!canSubmit}
               className="w-full"
            >
               {canSubmit ? 'Submit Selection' : `Select at least ${completionThreshold} areas`}
            </Button>
         )}

         {showResult && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center"
            >
               <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800">
                  <Check className="w-5 h-5 mr-2" />
                  Great job! +8 coins earned
               </div>
            </motion.div>
         )}
      </div>
   );
};

export default DiagramComponent;
