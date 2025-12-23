
// import controller
import { aiInsightsController } from "@controllers/AiInsights.controller";

// import services
import { aiInsightsService } from "@services/AiInsights.service";

// import mocks
import { aiInsightsMockRequest, aiInsightsMockResponse } from '@mocks/aiInsights.mock'; 

// utils
const id: string = 'uuid-123';
const input_summary: string = 'You are an assistant that...';
const ai_response: string = 'Resumo: Houve um aumento anormal no consumo médio de água...';
const insight_category: 'tips' | 'patterns' | 'anomalies' = 'patterns'; 
const consume_type: 'energy' | 'water' | 'gas' = 'water';
const created_at: Date = new Date(Date.now());
const fakeAiInsight = { id, input_summary, ai_response, insight_category, consume_type, created_at };


// mocks
jest.mock('@services/AiInsights.service');


describe('AiInsightController', () => {

   // before each tests
   beforeEach(() =>{
      jest.resetAllMocks(); // reset mock's states, like calls, implementations...
   });


   // create ai insights
   describe('createAiInsights', () => {

      // 201
      it('Should return 201 and create ai insights', async () => {
         // request / response
         const req = aiInsightsMockRequest({ consume_type, insight_category }) as any;
         const res = aiInsightsMockResponse();

         // spy functions
         jest.spyOn(aiInsightsService, 'createAiInsightsService').mockResolvedValue(fakeAiInsight);
      
         // controller method
         await aiInsightsController.createAiInsights(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(201);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Ai insights successfully created',
            data: fakeAiInsight
         });
      });

      // 500
      it('Should return 500 if ai insights create service throws error', async () => {
         // request / response
         const req = aiInsightsMockRequest({ consume_type, insight_category }) as any;
         const res = aiInsightsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(aiInsightsService, 'createAiInsightsService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await aiInsightsController.createAiInsights(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


});