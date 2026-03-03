
// class - tariffs entities
export class TariffEntity {
   
   // properties
   private readonly energy_tariff: number;
   private readonly water_tariff: number;
   private readonly gas_tariff: number;

   // constructor
   constructor(
      energy_tariff: number, 
      water_tariff: number, 
      gas_tariff: number
   ) {
      if (energy_tariff < 0 || water_tariff < 0 || gas_tariff < 0) {
         throw new Error("❌ Tariffs cannot be negative");
      }

      this.energy_tariff = energy_tariff;
      this.water_tariff = water_tariff;
      this.gas_tariff = gas_tariff;
   };


   // calculate energy cost
   public calculateEnergyCost(consume: number): number{
      return consume * this.energy_tariff;
   };

   
   // calculate water cost
   public calculateWaterCost(consume: number): number{
      return consume * this.water_tariff;
   };
   
   
   // calculate gas cost
   public calculateGasCost(consume: number): number{
      return consume * this.gas_tariff;
   };


   // calculate total cost
   public calculateTotalCost(
      energyConsume: number,
      waterConsume: number,
      gasConsume: number,
   ): number {
      return (
         this.calculateEnergyCost(energyConsume) +
         this.calculateWaterCost(waterConsume) +
         this.calculateGasCost(gasConsume)
      );
   };

};