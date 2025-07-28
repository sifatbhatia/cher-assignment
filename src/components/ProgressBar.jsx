import React from 'react';

const ProgressBar = ({ progress, className = '', showLabel = false, size = 'md' }) => {
   const clampedProgress = Math.min(Math.max(progress || 0, 0), 100);

   const sizeClasses = {
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3'
   };

   return (
      <div className={`w-full ${className}`}>
         {showLabel && (
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-medium text-gray-700">Progress</span>
               <span className="text-sm text-gray-500">{Math.round(clampedProgress)}%</span>
            </div>
         )}

         <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}>
            <div
               className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-700 ease-out rounded-full"
               style={{ width: `${clampedProgress}%` }}
            />
         </div>
      </div>
   );
};

export default ProgressBar;
