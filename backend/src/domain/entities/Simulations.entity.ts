
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
         this.averageConsumption.water *
         this.tariffs.water *
         (this.reductionPercent / 100);
      }

      // "gas" or "all"
      if (this.targetType === 'gas' || this.targetType === 'all') {
         saving +=
         this.averageConsumption.gas *
         this.tariffs.gas *
         (this.reductionPercent / 100);
      }

      return Number(saving.toFixed(2));
   };
}