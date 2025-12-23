
// import controller
import { tariffController } from "@controllers/Tariffs.controller";

// import services
import { tariffService } from "@services/Tariffs.service";

// import mocks
import { tariffsMockRequest, tariffsMockResponse } from "@mocks/tariffs.mock";


// utils
const id: string = 'uuid-123';
const energy_tariff: number = 1.05;
const water_tariff: number = 1.05;
const gas_tariff: number = 1.05;
const created_at: Date = new Date(Date.now());
const updated_at: Date = new Date(Date.now());
const fakeTariff = { id, energy_tariff, water_tariff, gas_tariff, created_at, updated_at };


// mocks
jest.mock('@services/Tariffs.service');


describe('TariffsController', () => {

   // before each tests
   beforeEach(() =>{
      jest.resetAllMocks(); // reset mock's states, like calls, implementations...
   });


   // create tariff
   describe('createTariff', () => {

      // 201
      it('Should return 201 and create tariff', async () => {
         // request / response
         const req = tariffsMockRequest({ energy_tariff, water_tariff, gas_tariff }) as any;
         const res = tariffsMockResponse();

         // spy functions
         jest.spyOn(tariffService, 'createTariffService').mockResolvedValue(fakeTariff);
      
         // controller method
         await tariffController.createTariff(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(201);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Tariff successfully created',
            data: fakeTariff
         });
      });

      // 500
      it('Should return 500 if tariff create service throws error', async () => {
         // request / response
         const req = tariffsMockRequest({ energy_tariff, water_tariff, gas_tariff }) as any;
         const res = tariffsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(tariffService, 'createTariffService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await tariffController.createTariff(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // get tariff
   describe('getTariff', () => {

      // 200
      it('Should return 200 and get tariff', async () => {
         // request / response
         const req = tariffsMockRequest({ }) as any;
         const res = tariffsMockResponse();

         // spy functions
         jest.spyOn(tariffService, 'getTariffService').mockResolvedValue(fakeTariff);
      
         // controller method
         await tariffController.getTariff(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Tariff get successfully',
            data: fakeTariff
         });
      });

      // 500
      it('Should return 500 if get tariff service throws error', async () => {
         // request / response
         const req = tariffsMockRequest({ }) as any;
         const res = tariffsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(tariffService, 'getTariffService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await tariffController.getTariff(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // update tariff
   describe('updateTariff', () => {

      // 200
      it('Should return 200 and update tariff', async () => {
         // request / response
         const req = tariffsMockRequest({ energy_tariff }) as any;
         const res = tariffsMockResponse();

         // spy functions
         jest.spyOn(tariffService, 'updateTariffService').mockResolvedValue(fakeTariff);
      
         // controller method
         await tariffController.updateTariff(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Update Tariff successfully',
            data: fakeTariff
         });
      });

      // 500
      it('Should return 500 if update tariff service throws error', async () => {
         // request / response
         const req = tariffsMockRequest({ energy_tariff }) as any;
         const res = tariffsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(tariffService, 'updateTariffService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await tariffController.updateTariff(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });

});