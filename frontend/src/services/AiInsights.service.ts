
// imports
import axios from "axios";

// import DTOs
import type { 
   AIInsightResponseDTO,
   CreateAIInsightDTO
} from '@DTOs/aiInsights.dtos';

// import routes
import { 
   aiInsightsRoutes,
   aiInsightsRoutesGet
} from "@routes/routes";



// ai insights service - frontend
class AIinsightsService {

   // create ai insights
   public async createAiInsightsService(
      data: CreateAIInsightDTO
   ): Promise<AIInsightResponseDTO> {
      try{
         const res = await axios.post(aiInsightsRoutes, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get ai insights
   public async getAiInsightsService(): Promise<AIInsightResponseDTO[]> {
      try{
         const res = await axios.get(aiInsightsRoutesGet);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get ai insights by category
   public async getAiInsightsByCategoryService(
      category: string 
   ): Promise<AIInsightResponseDTO[]> {
      try{
         const res = await axios.get(`${aiInsightsRoutesGet}/category`, {
            params: { q: category }
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


   // delete ai insights
   public async deleteAiInsightService(
      id: string
   ): Promise<void> {
      try{
         const res = await axios.delete(`${aiInsightsRoutes}/${id}`);
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
export const aiInsightsService: AIinsightsService = new AIinsightsService();