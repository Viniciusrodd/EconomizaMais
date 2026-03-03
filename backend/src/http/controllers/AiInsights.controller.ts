
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@interfaces/ApiResponse.interface";

// import services
import { aiInsightsService } from "@services/AiInsights.service";

// import utils
import { getErrorMessage } from "@utils/ErrorHandler.util";

// import DTOs
import { 
   CreateAIInsightDTO,
   AIInsightResponseDTO
} from '@DTOs/aiInsights.dtos';



// class - ai insights controller
class AIinsightsController {

   // create ai insight
   public async createAiInsights(
      req: Request<{}, {}, CreateAIInsightDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // create aiInsights - service
         const aiInsights: AIInsightResponseDTO = await aiInsightsService.createAiInsightsService(req.body);

         return res.status(201).json({
            success: true,
            message: '✔️ Ai insights successfully created',
            data: aiInsights
         });
      }
      catch(error){
         console.error('❌ Internal server error at Ai insights creation: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Ai insights creation',
            data: getErrorMessage(error)
         });
      }
   };


   // get ai insights
   public async getAiInsights(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // get aiInsights - service
         const aiInsights: AIInsightResponseDTO[] = await aiInsightsService.getAiInsightsService();

         return res.status(200).json({
            success: true,
            message: '✔️ Ai insights get successfully',
            data: aiInsights
         });
      }
      catch(error){
         console.error('❌ Internal server error at get Ai insights: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at get Ai insights',
            data: getErrorMessage(error)
         });
      }
   };

   // delete ai insight
   public async deleteAiInsight(
      req: Request<{id: string}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // params data
         const { id } = req.params;

         // delete aiInsight - service
         await aiInsightsService.deleteAiInsightService(id);

         return res.status(200).json({
            success: true,
            message: '✔️ Delete AI insight successfully',
         });
      }
      catch(error){
         console.error('❌ Internal server error at Delete AI insight: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Delete AI insight',
            data: getErrorMessage(error)
         });
      }
   };

};
export const aiInsightsController: AIinsightsController = new AIinsightsController(); 