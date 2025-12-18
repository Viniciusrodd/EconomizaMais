
// imports
import { Router } from "express";

// import controllers
import { monthlyConsumptionController } from "@controllers/MonthlyConsumption.controller";

// import middlewares
import { validate } from "@middlewares/HandleValidation.middleware";
import { monthlyConsumptionValidations } from "@middlewares/ControllerValidations/MonthlyConsumption.middleware"; 

// export router
export const monthConsRoutes: Router = Router();


//// monthlyConsumption routes - 5115


// create monthlyConsumption - POST
monthConsRoutes.post(
   '/monthly-consumption',
   monthlyConsumptionValidations.createMonthlyConsValidation(),
   validate,
   monthlyConsumptionController.createMonthCons
);


// get monthlyConsumption - GET
monthConsRoutes.get(
   '/monthly-consumption/:user_id',
   monthlyConsumptionController.getMonthCons
);
   
   
// update monthlyConsumption - PUT


// delete monthlyConsumption - DELETE


// get summary monthlyConsumption - GET