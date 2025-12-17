
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
   public async getTariff(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // get tariff - service
         const tariffs: TariffResponseDTO = await tariffService.getTariffService();

         return res.status(200).json({
            success: true,
            message: '✔️ Tariff get successfully',
            data: tariffs
         });
      }
      catch(error){
         console.error('❌ Internal server error at Get Tariff: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Get Tariff',
            data: getErrorMessage(error)
         });
      }
   };

   // update tariff
   public async updateUser(
      req: Request<{}, {}, UpdateTariffDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // update tariff - service
         const tariffs: TariffResponseDTO = await tariffService.updateTariffService(req.body);

         return res.status(200).json({
            success: true,
            message: '✔️ Update tariffs successfully',
            data: tariffs
         });
      }
      catch(error){
         console.error('❌ Internal server error at Update tariffs: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Update tariffs',
            data: getErrorMessage(error)
         });
      }
   };

}
export const tariffController: TariffController = new TariffController();