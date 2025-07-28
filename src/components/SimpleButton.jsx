import React from 'react';

const Button = ({ variant = 'primary', size = 'md', children, onClick, disabled, className = '' }) => {
   const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

   const variants = {
      primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white focus:ring-primary-500 transform hover:scale-[1.02] active:scale-[0.98]',
      secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
   };

   const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
   };

   const classes = [
      baseClasses,
      variants[variant] || variants.primary,
      sizes[size] || sizes.md,
      disabled && 'opacity-50 cursor-not-allowed transform-none',
      className
   ].filter(Boolean).join(' ');

   return (
      <button
         className={classes}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
};

export default Button;
