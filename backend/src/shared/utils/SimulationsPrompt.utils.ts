
// import DTOs
import { CreateSimulationDTO } from "@DTOs/Simulations.dtos";


// class - simulations prompt utils
export class SimulationsPrompt {

   public environmentalImpactPrompt(
      data: CreateSimulationDTO
   ): string {
      const { target_type, reduction_percent } = data;

      return `
         Explain in simple Portuguese how reducing 
         ${reduction_percent}% of ${target_type} 
         consumption helps reduce environmental impact.

         Keep it short and educational.
      `.trim();
   };

};