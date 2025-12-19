
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@interfaces/ApiResponse.interface";

// import services
import { simulationsService } from "@services/Simulations.service";

// import utils
import { getErrorMessage } from "@utils/ErrorHandler.util";

// import DTOs
import {
   CreateSimulationDTO,
   SimulationResponseDTO
} from '@DTOs/Simulations.dtos';



// class - simulations controller
class SimulationsController {

   // create simulations
   public async createSimulations(
      req: Request<{}, {}, CreateSimulationDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // create simulations - service
         const simulations: SimulationResponseDTO = await simulationsService.createSimulationsService(req.body);

         return res.status(201).json({
            success: true,
            message: '✔️ Simulations successfully created',
            data: simulations
         });
      }
      catch(error){
         console.error('❌ Internal server error at Simulations creation: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Simulations creation',
            data: getErrorMessage(error)
         });
      }
   };


   // get simulations
   public async getSimulations(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // get simulations - service
         const simulations: SimulationResponseDTO[] = await simulationsService.getSimulationsService();

         return res.status(200).json({
            success: true,
            message: '✔️ Simulations get successfully',
            data: simulations
         });
      }
      catch(error){
         console.error('❌ Internal server error at Get Simulations: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Get Simulations',
            data: getErrorMessage(error)
         });
      }
   };


   // delete simulation
   public async deleteSimulation(
      req: Request<{id: string}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const { id } = req.params;

         // delete simulation - service
         await simulationsService.deleteSimulationService(id);

         return res.status(200).json({
            success: true,
            message: '✔️ Delete simulation successfully',
         });
      }
      catch(error){
         console.error('❌ Internal server error at Delete Simulations: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Delete Simulations',
            data: getErrorMessage(error)
         });
      }
   };

};
export const simulationsController: SimulationsController = new SimulationsController();