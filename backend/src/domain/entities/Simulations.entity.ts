
// types
type TargetTypes = 'energy' | 'water' | 'gas' | 'all';
type Consume = 'energy_kwh' | 'water_m3' | 'gas_m3';

// interfaces
interface iTypes {
   energy: number;
   water: number;
   gas: number;
};

// import entities
import { MonthlyConsumptionHistoryEntity } from "./MonthlyConsumptionHistory.entity";

// import services
import { monthlyConsumptionService } from "@services/MonthlyConsumption.service";

// import interfaces
import { MonthlyConsumption } from "@interfaces/Entities.interface";



// class - Simulations entities
export class SimulationsEntities {
   // properties
   private readonly targetType: TargetTypes;
   private readonly reductionPercent: number;
   private readonly tariffs: iTypes;

   // constructor
   constructor(
      targetType: TargetTypes,
      reductionPercent: number,
      tariffs: iTypes
   ) {
      this.targetType = targetType;
      this.reductionPercent = reductionPercent;
      this.tariffs = tariffs
   };


   
   //// private methods


   // get consumptions
   private async getConsumptions(): Promise<MonthlyConsumption[]> {
      return await monthlyConsumptionService.getAllMonthConsService();
   };
   

   // avarage consume
   private async avarageConsume(consume: Consume): Promise<number> {
      // get conumptions - private
      const consumptions: MonthlyConsumption[] = await this.getConsumptions();
      
      // monthlyConsumptionHistory instance - get avarage consume
      const monthlyConsumptionHistory: MonthlyConsumptionHistoryEntity = new MonthlyConsumptionHistoryEntity(consumptions);
      const avarage = monthlyConsumptionHistory.buildSummary(consume);
      return avarage.average_consume;
   };



   ////

   

   // calculate Monthly Saving
   public async calculateMonthlySaving(): Promise<number> {
      // saving controll
      let saving = 0;
      
      // "energy" or "all"
      if (this.targetType === 'energy' || this.targetType === 'all') {
         const avarageConsume = await this.avarageConsume('energy_kwh');

         saving +=
         avarageConsume *
         this.tariffs.energy *
         (this.reductionPercent / 100);
      }

      // "water" or "all"
      if (this.targetType === 'water' || this.targetType === 'all') {
         const avarageConsume = await this.avarageConsume('water_m3');
         
         saving +=
         avarageConsume *
         this.tariffs.water *
         (this.reductionPercent / 100);
      }

      // "gas" or "all"
      if (this.targetType === 'gas' || this.targetType === 'all') {
         const avarageConsume = await this.avarageConsume('gas_m3');

         saving +=
         avarageConsume *
         this.tariffs.gas *
         (this.reductionPercent / 100);
      }

      return Number(saving.toFixed(2));
   };


   // calculate Annual Saving
   public async calculateAnnualSaving(): Promise<number> {
      const annualSaving = await this.calculateMonthlySaving() * 12
      return Number((annualSaving).toFixed(2));
   };
}