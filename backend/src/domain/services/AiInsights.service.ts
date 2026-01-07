
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
import { aiService } from '@services/UtilsServices/AI.service';

// import entities
import { MonthlyConsumptionHistoryEntity } from '@entities/MonthlyConsumptionHistory.entity';

// import utils
import { Prompts } from '@utils/Prompts.utils';



// class - ai insights service
class AIinsightsService {

   // create ai insight - public
   public async createAiInsightsService(
      aiInsightsData: CreateAIInsightDTO
   ): Promise<AIInsightResponseDTO> {
      // validations
      const { consume_type, insight_category } = aiInsightsData;
      if(!consume_type || !insight_category) throw new Error('Todos os campos são necessários');

      // check insight existence
      const isInsight = await models.AiInsightModel.findAll({
         where: { consume_type, insight_category }
      });
      if(isInsight.length > 0) throw new Error('Este insight já existe, crie outro para evitar redundâncias');

      // get user id
      const user = await models.UserModel.findOne({
         attributes: ['id']
      });
      if(!user){
         throw new Error('Usuário não encontrado');
      }

      // get monthly consumptions
      const consumptions = await monthlyConsumptionService.getAllMonthConsService();

      // get monthlyConsumptions entity
      const historyMonthlyConsumptions = new MonthlyConsumptionHistoryEntity(consumptions);

      // ai Insight Input Data - build
      const aiInsightInputData = {
         average_consume: 
            consume_type === 'energy' ? historyMonthlyConsumptions.buildSummary('energy_kwh').average_consume
            : consume_type === 'water' ? historyMonthlyConsumptions.buildSummary('water_m3').average_consume
            : consume_type === 'gas' ? historyMonthlyConsumptions.buildSummary('gas_m3').average_consume
            : 0,

         highest_consume_month:
            consume_type === 'energy' ? historyMonthlyConsumptions.buildSummary('energy_kwh').highest_consume_month
            : consume_type === 'water' ? historyMonthlyConsumptions.buildSummary('water_m3').highest_consume_month
            : consume_type === 'gas' ? historyMonthlyConsumptions.buildSummary('gas_m3').highest_consume_month
            : '',

         variation_last_month:
            consume_type === 'energy' ? historyMonthlyConsumptions.buildSummary('energy_kwh').variation_last_month
            : consume_type === 'water' ? historyMonthlyConsumptions.buildSummary('water_m3').variation_last_month
            : consume_type === 'gas' ? historyMonthlyConsumptions.buildSummary('gas_m3').variation_last_month 
            : 0           
      };

      // ai insight prompt input - build
      const aiInsightInput: AIInsightInputDTO = {
         insight_category,
         consume_type,
         average_consume: aiInsightInputData.average_consume,
         highest_consume_month: aiInsightInputData.highest_consume_month,
         variation_last_month: aiInsightInputData.variation_last_month
      };

      // get ai_response prompt
      const aiResponse = new Prompts();
      const prompt = aiResponse.aiResponsePrompt(aiInsightInput);

      // AI model request
      const message = await aiService.modelRequest(prompt, 'mistral');

      // ai insight DB creation
      const aiInsights = await models.AiInsightModel.create({
         user_id: user.id,
         input_summary: prompt,
         ai_response: message,
         insight_category,
         consume_type
      });

      return aiInsights;
   };


   // get ai insights - public
   public async getAiInsightsService(): Promise<AIInsightResponseDTO[]> {
      // get aiInsights - DB
      const aiInsights = await models.AiInsightModel.findAll();

      return aiInsights;
   };   


   // get ai insight by category - public
   public async getAiInsightsByCategoryService(
      insight_category: string
   ): Promise<AIInsightResponseDTO[]> {
      // validation
      if (!insight_category) {
         throw new Error('Categoria de insight não enviado');
      }

      // get ai insights
      const aiInsights = await models.AiInsightModel.findAll({
         where: { insight_category }
      });
      if(aiInsights.length <= 0) throw new Error('Insights não encontrados');
      
      return aiInsights;
   };


   // delete ai insight - public
   public async deleteAiInsightService(
      id: string
   ): Promise<void> {
      // get ai insights
      const aiInsight = await models.AiInsightModel.findByPk(id);
      if(!aiInsight) throw new Error('Insight não encontrado');

      await aiInsight.destroy();
   };

};
export const aiInsightsService: AIinsightsService = new AIinsightsService();