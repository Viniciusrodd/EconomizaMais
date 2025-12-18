
// util for monthly consumption entity


// import interfaces
import { MonthlyConsumption } from "@interfaces/Entities.interface";

// type
type Consume =
   | 'energy_kwh' 
   | 'water_m3'
   | 'gas_m3';


// filter consume
export const filterConsume = (
   consume: Consume,
   consumptions: MonthlyConsumption[]
): MonthlyConsumption[] => {
   let consumeType: MonthlyConsumption[];

   switch (consume) {
      case 'energy_kwh':
         consumeType = consumptions.filter(c => c.energy_kwh > 0);
         break;
      case 'water_m3':
         consumeType = consumptions.filter(c => c.water_m3 > 0);
         break;
      case 'gas_m3':
         consumeType = consumptions.filter(c => c.gas_m3 > 0);
         break;
   }

   return consumeType;
};

