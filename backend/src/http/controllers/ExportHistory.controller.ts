
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
   public async getHistories(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // get histories - service
         const histories: HistoriesResponseDTO[] = await exportHistoryService.getHistoriesService();

         return res.status(200).json({
            success: true,
            message: '✔️ Histories get successfully',
            data: histories
         });
      }
      catch(error){
         console.error('❌ Internal server error at get Histories: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at get Histories',
            data: getErrorMessage(error)
         });
      }
   };

   
   // get export history for download
   public async downloadPdf(
      req: Request<{ id: string }>,
      res: Response<iApiResponse>
   ): Promise<Response | void> {
      try{
         // params data
         const { id } = req.params;

         // history download - service
         const { filePath, fileName } = await exportHistoryService.downloadPdfService(id);

         // download
         return res.download(filePath, fileName);
      }
      catch(error){
         console.error('❌ Internal server error at downloading PDF:', error);
         return res.status(404).json({
            success: false,
            message: 'Internal server error at downloading PDF',
            data: getErrorMessage(error)
         });
      }
   };

};
export const exportHistoryController: ExportHistoryController = new ExportHistoryController();