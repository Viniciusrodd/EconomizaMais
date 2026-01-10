
// imports
import axios from "axios";

// import DTOs
import type { 
   CreateTariffDTO,
   TariffResponseDTO,
   UpdateTariffDTO
} from '@DTOs/Tariffs.dtos';

// import routes
import { tariffRoutes } from "@routes/routes";



// tariff service - frontend
class TariffService {

   // create tariff
   public async createTariffService(
      data: CreateTariffDTO
   ): Promise<TariffResponseDTO> {
      try{
         const res = await axios.post(tariffRoutes, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get tariffs
   public async getTariffService(): Promise<TariffResponseDTO> {
      try{
         const res = await axios.get(tariffRoutes);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // update tariff
   public async updateTariffService(
      data: UpdateTariffDTO
   ): Promise<TariffResponseDTO> {
      try{
         const res = await axios.put(tariffRoutes, data);
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
export const tariffService: TariffService = new TariffService();