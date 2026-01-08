
// imports
import { Router } from "express";

// import controllers
import { exportHistoryController } from "@controllers/ExportHistory.controller";

// import middlewares
import { historyValidations } from "@middlewares/ControllerValidations/ExportHistory.middleware";
import { validate } from "@middlewares/HandleValidation.middleware";


// export router
export const exportHistoryRoutes: Router = Router();


//// simulations routes - 5115


// create pdf history - POST
exportHistoryRoutes.post(
   '/pdf',
   exportHistoryController.createHistory
);


// get export histories - GET
exportHistoryRoutes.get(
   '/historic',
   exportHistoryController.getHistoric
);


// get export history for download - GET
exportHistoryRoutes.get(
   '/history/:id',
   historyValidations.downloadHistoryValidation(),
   validate,
   exportHistoryController.downloadPdf
);