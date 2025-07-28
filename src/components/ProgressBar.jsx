import React from 'react';

const ProgressBar = ({ progress, className, showLabel = false }) => {
   const progressWidth = Math.min(Math.max(progress, 0), 100);

   return (
      <div className={`w-full ${className || ''}`}>
         {showLabel && (
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-medium text-gray-700">Progress</span>
               <span className="text-sm text-gray-500">{Math.round(progressWidth)}%</span>
            </div>
         )}

         <div className="w-full bg-gray-200 rounded-full h-2">
            <div
               className="bg-blue-600 h-2 rounded-full transition-all duration-300"
               style={{ width: `${progressWidth}%` }}
            />
         </div>
      </div>
   );
};

export default ProgressBar;
