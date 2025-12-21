
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
   public async createHistory(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // create export history - service
         const pdfHistory: PDFResponseDTO = await exportHistoryService.createHistoryService();

         return res.status(201).json({
            success: true,
            message: '✔️ Export history successfully created',
            data: pdfHistory
         });
      }
      catch(error){
         console.error('❌ Internal server error at Export history creation: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Export history creation',
            data: getErrorMessage(error)
         });
      }
   };


   // get export histories


   // get export history for download

};
export const exportHistoryController: ExportHistoryController = new ExportHistoryController();