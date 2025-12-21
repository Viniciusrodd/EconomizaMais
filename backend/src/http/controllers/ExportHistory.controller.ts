
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@interfaces/ApiResponse.interface";

// import services
import { exportHistoryService } from "@services/ExportHistory.service";

// import utils
import { getErrorMessage } from "@utils/ErrorHandler.util";

// import DTOs
import {
   HistoriesResponseDTO,
   PDFResponseDTO
} from '@DTOs/ExportHistory.dtos';

// class - export history controller
class ExportHistoryController {

   // create pdf history


   // get export histories


   // get export history for download

};
export const exportHistoryController: ExportHistoryController = new ExportHistoryController();