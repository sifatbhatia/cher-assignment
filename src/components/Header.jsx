import { Coins, User } from 'lucide-react';
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCoins } from '../utils';

const Header = () => {
   const { user } = useAppContext();

   return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                     <span className="text-white font-bold text-sm">HL</span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">Home Learning</h1>
               </div>

               {/* User Info */}
               <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-amber-600">
                     <Coins className="w-5 h-5" />
                     <span className="font-semibold">{formatCoins(user.coins)}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                     </div>
                     <span className="text-sm font-medium text-gray-700 hidden sm:block">
                        {user.name}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
