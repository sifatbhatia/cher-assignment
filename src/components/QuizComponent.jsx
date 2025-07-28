import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import Button from './SimpleButton';

const QuizComponent = ({ element, onComplete }) => {
   const [selectedAnswer, setSelectedAnswer] = useState(null);
   const [hasSubmitted, setHasSubmitted] = useState(false);
   const [showResult, setShowResult] = useState(false);

   const handleSubmit = () => {
      if (selectedAnswer === null) return;

      setHasSubmitted(true);
      setShowResult(true);

      setTimeout(() => {
         onComplete();
      }, 2500);
   };

   const isCorrect = selectedAnswer === element.correctAnswer;

   return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
         <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Knowledge Check
         </h3>

         <p className="text-gray-700 text-base leading-relaxed mb-6">
            {element.question}
         </p>

         <div className="space-y-3 mb-6">
            {element.options.map((option, index) => (
               <motion.button
                  key={index}
                  whileHover={!hasSubmitted ? { scale: 1.01 } : {}}
                  whileTap={!hasSubmitted ? { scale: 0.99 } : {}}
                  onClick={() => !hasSubmitted && setSelectedAnswer(index)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedAnswer === index
                        ? hasSubmitted
                           ? index === element.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-red-500 bg-red-50 text-red-800'
                           : 'border-blue-500 bg-blue-50 text-blue-800'
                        : hasSubmitted && index === element.correctAnswer
                           ? 'border-green-500 bg-green-50 text-green-800'
                           : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                     } ${hasSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
               >
                  <div className="flex items-center space-x-3">
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index
                           ? hasSubmitted
                              ? index === element.correctAnswer
                                 ? 'border-green-500 bg-green-500'
                                 : 'border-red-500 bg-red-500'
                              : 'border-blue-500 bg-blue-500'
                           : hasSubmitted && index === element.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                        }`}>
                        {((selectedAnswer === index && hasSubmitted) ||
                           (hasSubmitted && index === element.correctAnswer)) && (
                              <Check className="w-4 h-4 text-white" />
                           )}
                     </div>
                     <span className="font-medium">{option}</span>
                  </div>
               </motion.button>
            ))}
         </div>

         {showResult && (
            <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               className={`mb-4 p-4 rounded-lg border ${isCorrect
                     ? 'border-green-200 bg-green-50'
                     : 'border-blue-200 bg-blue-50'
                  }`}
            >
               <div className="flex items-start space-x-3">
                  <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isCorrect ? 'text-green-600' : 'text-blue-600'
                     }`} />
                  <div>
                     <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-green-800' : 'text-blue-800'
                        }`}>
                        {isCorrect ? 'Correct!' : 'Good try!'}
                     </p>
                     <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-blue-700'
                        }`}>
                        {element.explanation}
                     </p>
                  </div>
               </div>
            </motion.div>
         )}

         {!hasSubmitted && (
            <Button
               onClick={handleSubmit}
               disabled={selectedAnswer === null}
               className="w-full"
            >
               {selectedAnswer === null ? 'Select an answer' : 'Submit Answer'}
            </Button>
         )}

         {showResult && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center"
            >
               <div className={`inline-flex items-center px-4 py-2 rounded-full ${isCorrect
                     ? 'bg-green-100 text-green-800'
                     : 'bg-blue-100 text-blue-800'
                  }`}>
                  <Check className="w-5 h-5 mr-2" />
                  +5 coins earned
               </div>
            </motion.div>
         )}
      </div>
   );
};

export default QuizComponent;
