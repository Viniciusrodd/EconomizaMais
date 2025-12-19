
// types
type TargetTypes = 'energy' | 'water' | 'gas' | 'all';

// interfaces
interface iTypes {
   energy: number;
   water: number;
   gas: number;
};


// class - Simulations entities
export class SimulationsEntities {
   // properties
   private readonly targetType: TargetTypes;
   private readonly reductionPercent: number;
   private readonly averageConsumption: iTypes;
   private readonly tariffs: iTypes;

   // constructor
   constructor(
      targetType: TargetTypes,
      reductionPercent: number,
      averageConsumption: iTypes, 
      tariffs: iTypes
   ) {
      // validations
      if (reductionPercent <= 0 || reductionPercent > 100) {
         throw new Error('Reduction percent must be between 0 and 100');
      }

      this.targetType = targetType;
      this.reductionPercent = reductionPercent;
      this.averageConsumption = averageConsumption; 
      this.tariffs = tariffs
   };


   // calculate Monthly Saving
   public calculateMonthlySaving(): number {
      // saving controll
      let saving = 0;
      
      // "energy" or "all"
      if (this.targetType === 'energy' || this.targetType === 'all') {

         saving +=
         this.averageConsumption.energy * 
         this.tariffs.energy *
         (this.reductionPercent / 100);
      }

      // "water" or "all"
      if (this.targetType === 'water' || this.targetType === 'all') {
         saving +=
         this.averageConsumption.energy * 
         this.tariffs.energy *
         (this.reductionPercent / 100);
      }

      // "gas" or "all"
      if (this.targetType === 'gas' || this.targetType === 'all') {
         saving +=
         this.averageConsumption.energy * 
         this.tariffs.energy *
         (this.reductionPercent / 100);
      }

      return Number(saving.toFixed(2));
   };


   // calculate Annual Saving
   public calculateAnnualSaving(): number {
      return Number((this.calculateMonthlySaving() * 12).toFixed(2));
   };


   // calculate Environmental Impact
   public calculateEnvironmentalImpact(): number {
      let impact = 0;

      if (this.targetType === 'energy' || this.targetType === 'all') {
         impact += this.averageConsumption.energy * 0.084; // 0.084 kg CO₂ per kWh saved
      }

      if (this.targetType === 'water' || this.targetType === 'all') {
         impact += this.averageConsumption.water * 0.0005; // 0.0005 kg CO₂ per liter saved
      }

      if (this.targetType === 'gas' || this.targetType === 'all') {
         impact += this.averageConsumption.gas * 2.0; // 2.0 kg CO₂ per m³ saved
      }

      impact = impact * (this.reductionPercent / 100);

      return Number(impact.toFixed(2));
   };
}