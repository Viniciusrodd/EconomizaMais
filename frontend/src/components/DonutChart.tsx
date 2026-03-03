
// import hooks
import type React from 'react';


// utils
type DonutChartProps = {
   percent: number;
   summary?: {
      average?: number;
      visualPercent: number;
   };
};



// donut chart 
const DonutChart: React.FC<DonutChartProps> = ({ percent, summary }) => {
   //// variables
   const safePercent = Math.min(Math.max(percent, 0), 100);


   //// functions


   // style set
   const style: React.CSSProperties = {
      background: `conic-gradient(
         var(--color4) 0% ${ summary?.visualPercent ? summary?.visualPercent : safePercent }%,
         var(--color3b) ${ summary?.visualPercent ? summary?.visualPercent : safePercent }% 100%
      )`
   };


   //// jsx


   return (
      <div className="donut" style={ style }>
         { summary?.average ? (
            <div className={`donut-hole-2 donut-hole`}>
               { summary?.average }
            </div>
         ) : (
            <div className="donut-hole">
               { safePercent }%
            </div>
         ) }
      </div>
   );
};

export default DonutChart;