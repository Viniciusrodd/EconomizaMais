
// imports
import axios from "axios";

// import DTOs
import type { 
   CreateMonthlyConsumptionDTO,
   MonthlyConsumptionResponseDTO,
   MonthlyConsumptionSummaryDTO,
   UpdateMonthlyConsumptionDTO
} from '@DTOs/monthlyConsumption.dtos';

// import routes
import { monthConsRoutes } from "@routes/routes";


// utils
type Consume = "energy_kwh" | "water_m3" | "gas_m3"



// monthly consumption service - frontend
class MonthlyConsumptionService {

   // create monthly consumption
   public async createMonthConsService(
      data: CreateMonthlyConsumptionDTO
   ): Promise<MonthlyConsumptionResponseDTO> {
      try{
         const res = await axios.post(monthConsRoutes, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get monthly consumption
   public async getMonthConsService(): Promise<MonthlyConsumptionResponseDTO[]> {
      try{
         const res = await axios.get(monthConsRoutes);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // update monthly consumption
   public async updateMonthConsService(
      id: string,
      data: UpdateMonthlyConsumptionDTO
   ): Promise<MonthlyConsumptionResponseDTO> {
      try{
         const res = await axios.put(`${monthConsRoutes}/${id}`, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // delete monthly consumption
   public async deleteMonthConsService(
      id: string,
   ): Promise<void> {
      try{
         await axios.delete(`${monthConsRoutes}/${id}`);
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get summary monthly consumption
   public async getMonthConsSummaryService(
      consume: Consume,
   ): Promise<MonthlyConsumptionSummaryDTO> {
      try{
         const res = await axios.get(`${monthConsRoutes}/consume`, {
            params: { q: consume }
         });
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };
   
};
export const monthlyConsumptionService: MonthlyConsumptionService = new MonthlyConsumptionService();