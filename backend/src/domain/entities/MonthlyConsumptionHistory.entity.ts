
// import interfaces
import { MonthlyConsumption } from "@interfaces/Entities.interface";

// type
type Consume = 'energy_kwh' | 'water_m3' | 'gas_m3';



// class - MonthlyConsumption entities
export class MonthlyConsumptionHistory_entity {
   // properties
   private readonly consumptions: MonthlyConsumption[];

   // constructor
   constructor(
      consumptions: MonthlyConsumption[],
   ) {
      this.consumptions = consumptions;
   };


   //// private methods


   // filter by consume
   private filterByConsume(type: Consume): MonthlyConsumption[] {
      return this.consumptions.filter(c => c[type] > 0);
   }

   // total consume
   private totalConsume(type: Consume): number {
      return this.consumptions.reduce(
         (sum, c) => sum + c[type],
         0
      );
   }


   //// public methods


   // avarage consume
   public getAvarageConsume(consume: Consume): number {
      // get / validate consume type
      const consumeFiltered: MonthlyConsumption[] = this.filterByConsume(consume);
      if (!consumeFiltered.length) return 0;

      // get total consume
      const total: number = this.totalConsume(consume);
      return Number((total / consumeFiltered.length).toFixed(2)); 
   };
};