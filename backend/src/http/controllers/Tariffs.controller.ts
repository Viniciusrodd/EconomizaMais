
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@interfaces/ApiResponse.interface";

// import services
import { tariffService } from "@services/Tariffs.service";

// import utils
import { getErrorMessage } from "@utils/ErrorHandler.util";


// import DTOs
import { 
   CreateTariffDTO,
   TariffResponseDTO,
   UpdateTariffDTO
} from '@DTOs/Tariffs.dtos';



// class - tariff controller
class TariffController {

   // create tariff
   public async createTariff(
      req: Request<{}, {}, CreateTariffDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // create tariff - service
         const tariffs: TariffResponseDTO = await tariffService.createTariffService(req.body);

         return res.status(201).json({
            success: true,
            message: '✔️ Tariff successfully created',
            data: tariffs
         });
      }
      catch(error){
         console.error('❌ Internal server error at Tariff creation: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Tariff creation',
            data: getErrorMessage(error)
         });
      }
   };


   // get tariff


   // update tariff

}
export const tariffController: TariffController = new TariffController();