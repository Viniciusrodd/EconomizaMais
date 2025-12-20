
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
   AIInsightInputDTO,
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


   // get ai insight by category


   // delete ai insight


};
export const aiInsightsController: AIinsightsController = new AIinsightsController(); 