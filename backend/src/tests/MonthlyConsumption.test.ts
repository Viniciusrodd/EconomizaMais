
// import controller
import { monthlyConsumptionController } from "@controllers/MonthlyConsumption.controller";

// import services
import { monthlyConsumptionService } from "@services/MonthlyConsumption.service";

// import mocks
import { monthConsMockRequest, monthConsMockResponse } from "@mocks/monthlyConsumption.mock";


// utils
const id: string = 'uuid-123';
const year: number = 2025;
const month: number = 12;
const energy_kwh: number = 1.05;
const water_m3: number = 1.05;
const gas_m3: number = 1.05;
const created_at: Date = new Date(Date.now());
const updated_at: Date = new Date(Date.now());
const fakeMonthCons = { id, year, month, energy_kwh, water_m3, gas_m3, created_at, updated_at };


// mocks
jest.mock('@services/MonthlyConsumption.service');


describe('MonthlyConsumptionController', () => {

   // before each tests
   beforeEach(() =>{
      jest.resetAllMocks(); // reset mock's states, like calls, implementations...
   });


   // create Monthly Consumption
   describe('createMonthCons', () => {

      // 201
      it('Should return 201 and create month cons', async () => {
         // request / response
         const req = monthConsMockRequest({ year, month, energy_kwh, water_m3, gas_m3 }) as any;
         const res = monthConsMockResponse();

         // spy functions
         jest.spyOn(monthlyConsumptionService, 'createMonthConsService').mockResolvedValue(fakeMonthCons);
      
         // controller method
         await monthlyConsumptionController.createMonthCons(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(201);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Monthly Consumption successfully created',
            data: fakeMonthCons
         });
      });

      // 500
      it('Should return 500 if month cons create service throws error', async () => {
         // request / response
         const req = monthConsMockRequest({ year, month, energy_kwh, water_m3, gas_m3 }) as any;
         const res = monthConsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(monthlyConsumptionService, 'createMonthConsService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await monthlyConsumptionController.createMonthCons(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // get Monthly Consumptions
   describe('getMonthCons', () => {

      // 201
      it('Should return 200 and get month cons', async () => {
         // request / response
         const req = monthConsMockRequest({ }) as any;
         const res = monthConsMockResponse();

         // spy functions
         jest.spyOn(monthlyConsumptionService, 'getMonthConsService').mockResolvedValue([fakeMonthCons]);
      
         // controller method
         await monthlyConsumptionController.getMonthCons(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Monthly Consumption get successfully',
            data: [fakeMonthCons]
         });
      });

      // 500
      it('Should return 500 if month cons get service throws error', async () => {
         // request / response
         const req = monthConsMockRequest({ }) as any;
         const res = monthConsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(monthlyConsumptionService, 'getMonthConsService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await monthlyConsumptionController.getMonthCons(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });

});