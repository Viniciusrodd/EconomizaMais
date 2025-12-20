
// import DTOs
import { 
   CreateAIInsightDTO,
   AIInsightInputDTO,
   AIInsightResponseDTO
} from '@DTOs/aiInsights.dtos';

// import models
import { models } from "@root/infra/sequelize/Relations";

// import services 
import { monthlyConsumptionService } from '@services/MonthlyConsumption.service';
import { aiService } from '@services/AiServices/AI.service';

// import entities
import { MonthlyConsumptionHistoryEntity } from '@entities/MonthlyConsumptionHistory.entity';

// import utils
import { Prompts } from '@utils/Prompts.utils';



// class - ai insights service
class AIinsightsService {

   // create ai insight - public


   // get ai insights - public


   // get ai insight by category - public


   // delete ai insight - public
   

};
export const aiInsightsService: AIinsightsService = new AIinsightsService();