import React from 'react';

const Button = ({ variant = 'primary', size = 'md', children, onClick, disabled, className = '' }) => {
   let classes = 'inline-flex items-center justify-center font-medium rounded transition-colors ';

   if (size === 'sm') classes += 'px-3 py-2 text-sm ';
   else if (size === 'lg') classes += 'px-8 py-4 text-lg ';
   else classes += 'px-6 py-3 text-base ';

   if (variant === 'primary') {
      classes += 'bg-blue-600 text-white hover:bg-blue-700 ';
   } else if (variant === 'secondary') {
      classes += 'bg-gray-200 text-gray-800 hover:bg-gray-300 ';
   } else if (variant === 'outline') {
      classes += 'border border-blue-600 text-blue-600 hover:bg-blue-50 ';
   }

   if (disabled) classes += 'opacity-50 cursor-not-allowed ';
   classes += className;

   return (
      <button className={classes} onClick={onClick} disabled={disabled}>
         {children}
      </button>
   );
};

export default Button;
