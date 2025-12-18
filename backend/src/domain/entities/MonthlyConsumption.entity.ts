
// import interfaces
import { MonthlyConsumption } from "@interfaces/Entities.interface";



// class - MonthlyConsumption entities
export class MonthlyConsumptionEntity {
   // properties
   private readonly energy_kwh: number;
   private readonly water_m3: number;
   private readonly gas_m3: number;

   // constructor
   constructor(
      energy_kwh: number,
      water_m3: number,
      gas_m3: number
   ) {
      this.energy_kwh = energy_kwh;
      this.water_m3 = water_m3;
      this.gas_m3 = gas_m3;
   };


   // diff between monthly consumptions
   compareWith(other: MonthlyConsumption) {
      return {
         energyDiff: this.energy_kwh - other.energy_kwh,
         waterDiff: this.water_m3 - other.water_m3,
         gasDiff: this.gas_m3 - other.gas_m3,
      };
   };

};