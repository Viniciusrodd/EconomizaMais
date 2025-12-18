
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@interfaces/ApiResponse.interface";

// import services
import { monthlyConsumptionService } from "@services/MonthlyConsumption.service";

// import utils
import { getErrorMessage } from "@utils/ErrorHandler.util";

// import DTOs
import { 
   CreateMonthlyConsumptionDTO,
   UpdateMonthlyConsumptionDTO,
   MonthlyConsumptionResponseDTO,
   MonthlyConsumptionSummaryDTO
} from '@DTOs/monthlyConsumption.dtos';



// class - MonthlyConsumption controller
class MonthlyConsumptionController {

   // create monthlyConsumption
   public async createMonthCons(
      req: Request<{}, {}, CreateMonthlyConsumptionDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // create monthlyConsumption - service
         const monthlyConsumption = await monthlyConsumptionService.createMonthConsService(req.body);

         return res.status(201).json({
            success: true,
            message: '✔️ Monthly Consumption successfully created',
            data: monthlyConsumption
         });
      }
      catch(error){
         console.error('❌ Internal server error at Monthly Consumption creation: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Monthly Consumption creation',
            data: getErrorMessage(error)
         });
      }
   };

   // get monthlyConsumption
   public async getMonthCons(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const { user_id } = req.params;

         // get monthlyConsumption - service
         const monthlyConsumptions = await monthlyConsumptionService.getMonthConsService(user_id);

         return res.status(200).json({
            success: true,
            message: '✔️ Monthly Consumption get successfully',
            data: monthlyConsumptions
         });
      }
      catch(error){
         console.error('❌ Internal server error at Get Monthly Consumption: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Get Monthly Consumption',
            data: getErrorMessage(error)
         });
      }
   };
   
   // update monthlyConsumption


   // delete monthlyConsumption


   // get summary monthlyConsumption

};
export const monthlyConsumptionController: MonthlyConsumptionController = new MonthlyConsumptionController();