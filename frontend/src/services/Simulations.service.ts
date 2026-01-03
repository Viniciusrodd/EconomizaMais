
// imports
import axios from "axios";

// import DTOs
import type { 
   CreateSimulationDTO,
   SimulationResponseDTO
} from '@DTOs/Simulations.dtos';

// import routes
import { simulationsRoutes } from "@routes/routes";



// simulations service - frontend
class SimulationsService {

   // create simulations
   public async createSimulationService(
      data: CreateSimulationDTO
   ): Promise<SimulationResponseDTO> {
      try{
         const res = await axios.post(simulationsRoutes, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get simulations
   public async getSimulationService(): Promise<SimulationResponseDTO[]> {
      try{
         const res = await axios.get(simulationsRoutes);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // delete simulations
   public async deleteSimulationService(
      id: string
   ): Promise<void> {
      try{
         await axios.delete(`${simulationsRoutes}/${id}`);
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };
   
};
export const simulationsService: SimulationsService = new SimulationsService();