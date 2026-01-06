
// import hooks
import type React from 'react';

// utils
type DonutChartProps = {
   percent: number;
};


// donut chart 
const DonutChart: React.FC<DonutChartProps> = ({ percent }) => {
   //// variables
   const safePercent = Math.min(Math.max(percent, 0), 100);


   //// functions


   // style set
   const style: React.CSSProperties = {
      background: `conic-gradient(
         var(--color4) 0% ${safePercent}%,
         var(--color1) ${safePercent}% 100%
      )`
   };


   //// jsx


   return (
      <div className="donut" style={ style }>
         <div className="donut-hole">
            {safePercent}%
         </div>
      </div>
   );
};

export default DonutChart;