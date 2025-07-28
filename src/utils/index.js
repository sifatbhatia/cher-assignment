export function calculateTimeToComplete(totalLessons, completedLessons) {
   const remaining = totalLessons - completedLessons;
   const mins = remaining * 5;

   if (mins < 60) return `${mins} min`;
   
   const hrs = Math.floor(mins / 60);
   const leftover = mins % 60;
   
   return leftover > 0 ? `${hrs}h ${leftover}m` : `${hrs}h`;
}

export function formatCoins(amount) {
   return amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount.toString();
}
