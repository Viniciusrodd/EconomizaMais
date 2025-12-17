
// imports
import { Router } from "express";

// import controllers
import { tariffController } from "@controllers/Tariffs.controller";

// import middlewares
import { validate } from "@middlewares/HandleValidation.middleware";
import { tariffsValidations } from "@middlewares/ControllerValidations/TariffsValidations.middleware";

// export router
export const tariffsRoutes: Router = Router();


//// tariff routes - 5115


// tariff creation - POST
tariffsRoutes.post(
   '/tariff',
   tariffsValidations.tariffCreationValidation(),
   validate,
   tariffController.createTariff
);

// get tariff - GET
tariffsRoutes.get(
   '/tariff',
   tariffController.getTariff
);
   
   
/*
// update tariff - PUT
tariffsRoutes.put(
   '/tariff',
   tariffsValidations.tariffsUpdateValidations,
   validate,
   // controller
);
*/