
// imports
import { Router } from "express";

// import controllers
import { aiInsightsController } from "@controllers/AiInsights.controller";

// import middlewares
import { aiInsightsValidations } from "@middlewares/ControllerValidations/AiInsights.middleware";
import { validate } from "@middlewares/HandleValidation.middleware";


// export router
export const aiInsightsRoutes: Router = Router();


//// simulations routes - 5115


// create ai insight - POST
aiInsightsRoutes.post(
   '/insight',
   aiInsightsValidations.createAiInsightsValidation(),
   validate,
   aiInsightsController.createAiInsights
);


// get ai insights - GET
aiInsightsRoutes.get(
   '/insights',
   aiInsightsController.getAiInsights
);


// get ai insight by category - GET
aiInsightsRoutes.get(
   '/insights/category',
   aiInsightsValidations.getAiInsightsValidation(),
   validate,
   aiInsightsController.getAiInsightsByCategory
);


// delete ai insight - DELETE
aiInsightsRoutes.delete(
   '/insight/:id',
   aiInsightsValidations.deleteAiInsightsValidation(),
   validate,
   aiInsightsController.deleteAiInsight
);