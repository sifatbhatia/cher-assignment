import { AnimatePresence, motion } from 'framer-motion';
import { Coins } from 'lucide-react';

const CoinAnimation = ({ amount, isVisible }) => {
   return (
      <AnimatePresence>
         {isVisible && amount > 0 && (
            <motion.div
               className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     z-50 pointer-events-none"
               initial={{ scale: 0, opacity: 0 }}
               animate={{
                  scale: [0, 1.3, 1],
                  y: [0, -20, -50],
                  opacity: [0, 1, 0]
               }}
               exit={{ opacity: 0 }}
               transition={{
                  duration: 1.8,
                  times: [0, 0.3, 1],
                  ease: "easeOut"
               }}
            >
               <div className="flex items-center space-x-2 px-4 py-3 
                         bg-accent-400 text-accent-900 rounded-full shadow-lg
                         text-lg font-bold">
                  <Coins className="w-6 h-6" />
                  <span>+{amount}</span>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default CoinAnimation;
