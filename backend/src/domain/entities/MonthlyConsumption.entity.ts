
// import interfaces
import { MonthlyConsumption } from "@interfaces/Entities.interface";

// import utils
import { filterConsume } from "@utils/MonthlyConsumption.util";

// type
type Consume =
   | 'energy_kwh' 
   | 'water_m3'
   | 'gas_m3';



// class - MonthlyConsumption entities
export class MonthlyConsumptionEntity {
   // properties
   private readonly energy_kwh: number;
   private readonly water_m3: number;
   private readonly gas_m3: number;
   private readonly consumptions: MonthlyConsumption[];

   // constructor
   constructor(
      energy_kwh: number,
      water_m3: number,
      gas_m3: number,
      consumptions: MonthlyConsumption[],
   ) {
      this.energy_kwh = energy_kwh;
      this.water_m3 = water_m3;
      this.gas_m3 = gas_m3;
      this.consumptions = consumptions;
   };


   // diff between monthly consumptions
   public compareWith(other: MonthlyConsumption) {
      return {
         energyDiff: this.energy_kwh - other.energy_kwh,
         waterDiff: this.water_m3 - other.water_m3,
         gasDiff: this.gas_m3 - other.gas_m3,
      };
   };


   /* avarage consume
   public getAvarageConsume(consume: Consume): number {
      // get / validate consume type
      let consumeFiltered: MonthlyConsumption[] = filterConsume(consume, this.consumptions);
      if (!consumeFiltered.length) return 0;

   };
   */
};