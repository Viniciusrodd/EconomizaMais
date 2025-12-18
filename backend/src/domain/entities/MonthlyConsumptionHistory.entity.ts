
// import interfaces
import { MonthlyConsumption } from "@interfaces/Entities.interface";
import { MonthlyConsumptionSummaryDTO } from "@DTOs/monthlyConsumption.dtos";

// type
type Consume = 'energy_kwh' | 'water_m3' | 'gas_m3';


// class - MonthlyConsumption entities
export class MonthlyConsumptionHistoryEntity {
   // properties
   private readonly consumptions: MonthlyConsumption[];

   // constructor
   constructor(
      consumptions: MonthlyConsumption[],
   ) {
      this.consumptions = consumptions;
   };


   // filter by consume
   private filterByConsume(type: Consume): MonthlyConsumption[] {
      return this.consumptions.filter(c => Number(c[type]) > 0);
   };

   // total consume
   private totalConsume(type: Consume): number {
      return this.consumptions.reduce((sum, c) => sum + Number(c[type]), 0);
   };

   // max consume
   private maxConsume(type: Consume): MonthlyConsumption {
      return this.consumptions.reduce((prev, curr) => 
         curr[type] > prev[type] ? curr : prev
      );
   };


   /////


   // avarage consume
   private getAvarageConsume(consume: Consume): number {
      // get / validate consume type
      const consumeFiltered: MonthlyConsumption[] = this.filterByConsume(consume);
      if (!consumeFiltered.length) return 0;

      // get total consume
      const total: number = this.totalConsume(consume);
      return Number((total / consumeFiltered.length).toFixed(2)); 
   };


   // highest consume month
   private getHighestConsume(consume: Consume): string | null{
      // validation
      if(!this.consumptions.length) return null;

      // get max consume
      const max = this.maxConsume(consume);

      return `${max.year} - ${String(max.month).padStart(2, '0')}`
   };


   // last month variation
   private getLastMonthVariation(consume: Consume): number {
      // validations - at least 2 consumptions register
      if (this.consumptions.length < 2) return 0;

      // example
      // Before: [2025-Mar, 2024-Dec, 2025-Jan]
      // after: [2024-Dec, 2025-Jan, 2025-Mar]
      const sorted = [...this.consumptions].sort((a, b) =>
         a.year === b.year
         ? a.month - b.month
         : a.year - b.year
      );

      // select elements
      const last = sorted[sorted.length - 1];
      const prev = sorted[sorted.length - 2];

      // 0% if not prev consume
      if (prev[consume] === 0) return 0;

      return Number(
         (((last[consume] - prev[consume]) / prev[consume]) * 100).toFixed(2)
      );
   };


   // summary setup
   public buildSummary(consume: Consume): MonthlyConsumptionSummaryDTO {
      return {
         average_consume: this.getAvarageConsume(consume),
         highest_consume_month: this.getHighestConsume(consume),
         variation_last_month: this.getLastMonthVariation(consume)
      };
   };
};