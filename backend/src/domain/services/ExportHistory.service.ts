
// imports
import path from 'path';
import fs from 'fs';

// import DTOs
import {
   HistoriesResponseDTO,
   PDFResponseDTO,
   PDFGenerationDTO,
   FileDataResponseDTO
} from '@DTOs/ExportHistory.dtos';

// import models
import { models } from "@root/infra/sequelize/Relations";

// import services 
import { pdfService } from '@services/UtilsServices/PDF.service';



// class - export history service
class ExportHistoryService {

   // create pdf history
   public async createHistoryService(): Promise<PDFResponseDTO> {
      // get user data
      const user = await models.UserModel.findOne({
         attributes: ['id', 'name', 'residence_name', 'number_of_residents']
      });
      if(!user) throw new Error('User not found');

      // get tariff data
      const tariff = await models.TariffModel.findOne({
         attributes: ['energy_tariff', 'water_tariff', 'gas_tariff']
      });
      if(!tariff) throw new Error('Tariff not found');

      // get monthly consumptions
      const monthConsumptions = await models.MonthlyConsumptionModel.findAll({
         attributes: ['year', 'month', 'energy_kwh', 'water_m3', 'gas_m3']
      });
      if(monthConsumptions.length <= 0) throw new Error('Monthly consumptions not found');

      // build PDF generation data
      const PDFGeneration: PDFGenerationDTO = {
         user_data: user,
         user_tariffs: tariff,
         user_month_consumptions: monthConsumptions
      };

      // pdf service
      const file_path = await pdfService.pdfGeneration(PDFGeneration);

      // build PDF response data
      const PDFResponse: PDFResponseDTO = {
         user_data: user,
         user_tariffs: tariff,
         user_month_consumptions: monthConsumptions,
         file_path
      };

      // create export history
      await models.ExportHistoryModel.create({
         user_id: user.id,
         file_path: PDFResponse.file_path
      });

      return PDFResponse;
   };


   // get export histories
   public async getHistoriesService(): Promise<HistoriesResponseDTO[]> {
      // get histories 
      const histories = await models.ExportHistoryModel.findAll({
         attributes: ['id', 'file_path', 'created_at']
      });
      if(histories.length <= 0) throw new Error('Histories not found');

      return histories;
   };


   // get export history for download
   public async downloadPdfService(
      id: string
   ): Promise<FileDataResponseDTO> {
      // get history
      const history = await models.ExportHistoryModel.findByPk(id, {
         attributes: ['id', 'file_path', 'created_at']
      });
      if(!history) throw new Error('History not found');

      // file path
      const filePath = history.file_path;

      // safety check
      if(!fs.existsSync(filePath)) throw new Error('PDF file not found on disk');

      // file name
      const fileName = path.basename(filePath);

      return {
         filePath,
         fileName
      };
   };

};
export const exportHistoryService: ExportHistoryService = new ExportHistoryService();