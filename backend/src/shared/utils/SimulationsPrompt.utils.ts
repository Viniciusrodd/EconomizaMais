
// import DTOs
import { CreateSimulationDTO } from "@DTOs/Simulations.dtos";


// class - simulations prompt utils
export class SimulationsPrompt {

   public environmentalImpactPrompt(
      data: CreateSimulationDTO
   ): string {
      const { target_type, reduction_percent } = data;

      return `
         You are an educational support system for calculating household environmental impact.

         Objective:
         Calculate a simple monthly environmental impact estimate (in kg of CO₂ avoided)
         based on a consumption reduction reported by the user.

         Simulation data:
         - Consumption type: ${target_type}
         - Reduction percentage: ${reduction_percent}%

         Consider the following average premises:
         - Electricity: 0.084 kg of CO₂ per kWh saved
         - Water: 0.0005 kg of CO₂ per liter saved
         - Gas: 2.0 kg of CO₂ per m³ saved

         Required rules:
         - Return ONLY a formatted string in Portuguese.
         - Format the CO₂ value with two decimal places using comma as decimal separator.
         - The string must follow this exact format: "Você economizaria cerca de X,XX kg de CO₂"
         - The value must represent the total estimated CO₂ avoided for the month.
         - If the type is "all", consider a simple average of the three impacts.

         Valid response example:
         "Você economizaria cerca de 12,75 kg de CO₂"
      `.trim();
   };

};