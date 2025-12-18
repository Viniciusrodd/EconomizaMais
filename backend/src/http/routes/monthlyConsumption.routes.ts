
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
   '/monthly-consumption',
   monthlyConsumptionController.getMonthCons
);
   
   
// update monthlyConsumption - PUT
monthConsRoutes.put(
   '/monthly-consumption/:id',
   monthlyConsumptionValidations.updateMonthlyConsValidation(),
   validate,
   monthlyConsumptionController.updateMonthCons
);


// delete monthlyConsumption - DELETE
monthConsRoutes.delete(
   '/monthly-consumption/:id',
   monthlyConsumptionValidations.deleteMonthlyConsValidation(),
   validate,
   monthlyConsumptionController.deleteMonthCons
);


// get summary monthlyConsumption - GET