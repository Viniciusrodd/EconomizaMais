
// import DTOs
import {
   HistoriesResponseDTO,
   PDFResponseDTO,
   PDFGenerationDTO
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


   // get export history for download

};
export const exportHistoryService: ExportHistoryService = new ExportHistoryService();