
// import controller
import { exportHistoryController } from "@controllers/ExportHistory.controller";

// import services
import { exportHistoryService } from "@services/ExportHistory.service";

// import mocks
import { historyMockRequest, historyMockResponse } from '@mocks/exportHistory.mock';

// import DTOs
import { 
   UserDataToExportDTO, 
   TariffsToExportDTO, 
   MonthConsumptionsToExportDTO 
} from "@DTOs/ExportHistory.dtos";


// utils
const id: string = 'uuid-123';
const user_data: UserDataToExportDTO = { 
   id: 'uuid-321', name: 'test', residence_name: 'test', number_of_residents: 2 
};
const user_tariffs: TariffsToExportDTO = {
   energy_tariff: 1.05, water_tariff: 1.05, gas_tariff: 1.05
};
const user_month_consumptions: MonthConsumptionsToExportDTO[] = [{
   year: 2025, month: 12, energy_kwh: 1.05, water_m3: 1.05, gas_m3: 1.05
}];
const file_path: string = 'path1.pdf';
const file_name: string = 'test';
const created_at: Date = new Date(Date.now());
const fakePDF = { id, user_data, user_tariffs, user_month_consumptions, file_path, created_at };
const fakeHistory = { id, file_path, created_at };


// mocks
jest.mock('@services/ExportHistory.service');


describe('ExportHistoryController', () => {

   // before each tests
   beforeEach(() =>{
      jest.resetAllMocks(); // reset mock's states, like calls, implementations...
   });


   // create history
   describe('createHistory', () => {

      // 201
      it('Should return 201 and create history', async () => {
         // request / response
         const req = historyMockRequest({}) as any;
         const res = historyMockResponse();

         // spy functions
         jest.spyOn(exportHistoryService, 'createHistoryService').mockResolvedValue(fakePDF);
      
         // controller method
         await exportHistoryController.createHistory(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(201);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Export history successfully created',
            data: fakePDF
         });
      });

      // 500
      it('Should return 500 if history create service throws error', async () => {
         // request / response
         const req = historyMockRequest({}) as any;
         const res = historyMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(exportHistoryService, 'createHistoryService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await exportHistoryController.createHistory(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // get history
   describe('getHistory', () => {

      // 200
      it('Should return 200 and get history', async () => {
         // request / response
         const req = historyMockRequest({}) as any;
         const res = historyMockResponse();

         // spy functions
         jest.spyOn(exportHistoryService, 'getHistoriesService').mockResolvedValue([fakeHistory]);
      
         // controller method
         await exportHistoryController.getHistories(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Histories get successfully',
            data: [fakeHistory]
         });
      });

      // 500
      it('Should return 500 if get history service throws error', async () => {
         // request / response
         const req = historyMockRequest({}) as any;
         const res = historyMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(exportHistoryService, 'getHistoriesService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await exportHistoryController.getHistories(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // download history
   describe('downloadHistory', () => {

      // download
      it('Should download history', async () => {
         // request / response
         const req = historyMockRequest({}, { id }) as any;
         const res = historyMockResponse();

         // spy functions
         jest.spyOn(exportHistoryService, 'downloadPdfService').mockResolvedValue({ 
            filePath: file_path, 
            fileName: file_name 
         });
      
         // controller method
         await exportHistoryController.downloadPdf(req, res);

         // expects
         expect(res.download).toHaveBeenCalledWith(file_path, file_name);
      });

      // 500
      it('Should return 500 if download history service throws error', async () => {
         // request / response
         const req = historyMockRequest({}, { id }) as any;
         const res = historyMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(exportHistoryService, 'downloadPdfService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await exportHistoryController.downloadPdf(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });   

});