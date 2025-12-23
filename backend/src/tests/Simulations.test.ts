
// import controller
import { simulationsController } from "@controllers/Simulations.controller";

// import services
import { simulationsService } from "@services/Simulations.service";

// import mocks
import { simulationsMockRequest, simulationsMockResponse } from '@mocks/simulations.mock';

// utils
const id: string = 'uuid-123';
const target_type: 'energy' | 'water' | 'gas' | 'all' = 'water';
const reduction_percent: number = 50;
const monthly_saving: number = 41.44;
const annual_saving: number = 497.28;
const environmental_impact: number = 3.19;
const feedback: string = 'Diminuir a consumo de água em 50% ajuda a reduzir o impacto ambiental';
const created_at: Date = new Date(Date.now());
const fakeSimulation = { id, target_type, reduction_percent, monthly_saving, annual_saving, environmental_impact, feedback, created_at };


// mocks
jest.mock('@services/Simulations.service');


describe('SimulationsController', () => {

   // before each tests
   beforeEach(() =>{
      jest.resetAllMocks(); // reset mock's states, like calls, implementations...
   });


   // create simulations
   describe('createSimulations', () => {

      // 201
      it('Should return 201 and create simulations', async () => {
         // request / response
         const req = simulationsMockRequest({ target_type, reduction_percent }) as any;
         const res = simulationsMockResponse();

         // spy functions
         jest.spyOn(simulationsService, 'createSimulationsService').mockResolvedValue(fakeSimulation);
      
         // controller method
         await simulationsController.createSimulations(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(201);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Simulations successfully created',
            data: fakeSimulation
         });
      });

      // 500
      it('Should return 500 if simulations create service throws error', async () => {
         // request / response
         const req = simulationsMockRequest({ target_type, reduction_percent }) as any;
         const res = simulationsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(simulationsService, 'createSimulationsService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await simulationsController.createSimulations(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });


   // get simulations
   describe('getSimulations', () => {

      // 200
      it('Should return 200 and get simulations', async () => {
         // request / response
         const req = simulationsMockRequest({}) as any;
         const res = simulationsMockResponse();

         // spy functions
         jest.spyOn(simulationsService, 'getSimulationsService').mockResolvedValue([fakeSimulation]);
      
         // controller method
         await simulationsController.getSimulations(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: '✔️ Simulations get successfully',
            data: [fakeSimulation]
         });
      });

      // 500
      it('Should return 500 if get simulations service throws error', async () => {
         // request / response
         const req = simulationsMockRequest({ }) as any;
         const res = simulationsMockResponse();

         // spy functions
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         jest.spyOn(simulationsService, 'getSimulationsService').mockRejectedValue(new Error('Service error (test)'));

         // controller method
         await simulationsController.getSimulations(req, res);

         // expects
         expect(res.status).toHaveBeenCalledWith(500);

         // restore mock
         consoleSpy.mockRestore();
      });

   });

});