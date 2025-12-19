
// import DTOs
import {
   CreateSimulationDTO,
   SimulationResponseDTO
} from '@DTOs/Simulations.dtos';

// import models
import { models } from "@root/infra/sequelize/Relations";



// class - simulations service
class SimulationsService {

   /* create simulations - public
   public async createSimulationsService(
      simulationsData: CreateSimulationDTO
   ): Promise<SimulationResponseDTO> {
      // validations
      const { target_type, reduction_percent } = simulationsData;
      if(!target_type || !reduction_percent){ 
         throw new Error('All simulations fields are required');
      }

      // get user id
      const user = await models.UserModel.findOne();
      if(!user){
         throw new Error('User not found');
      }


   };
   */


   // get simulations - public


   // delete simulation - public


};
export const simulationsService: SimulationsService = new SimulationsService();