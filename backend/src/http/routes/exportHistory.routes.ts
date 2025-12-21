
// imports
import { Router } from "express";

// import controllers
import { exportHistoryController } from "@controllers/ExportHistory.controller";

// import middlewares
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


// get export history for download - GET