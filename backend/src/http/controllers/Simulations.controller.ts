
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
   public async createTariff(
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


   // delete simulation


};
export const simulationsController: SimulationsController = new SimulationsController();