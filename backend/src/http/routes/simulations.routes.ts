
// imports
import { Router } from "express";

// import controllers
import { simulationsController } from "@controllers/Simulations.controller";

// import middlewares
import { validate } from "@middlewares/HandleValidation.middleware";
import { simulationsValidations } from "@middlewares/ControllerValidations/Simulations.middleware";

// export router
export const simulationsRoutes: Router = Router();


//// simulations routes - 5115


// create simulations - POST
simulationsRoutes.post(
   '/simulation',
   simulationsValidations.createSimulationsValidation(),
   validate,
   simulationsController.createSimulations
);


// get simulations - GET
simulationsRoutes.get(
   '/simulation',
   simulationsController.getSimulations
);


// delete simulation - DELETE
simulationsRoutes.delete(
   '/simulation/:id',
   simulationsValidations.deleteSimulationsValidation(),
   validate,
   simulationsController.deleteSimulation
);