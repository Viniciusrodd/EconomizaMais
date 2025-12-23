
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
} from '@DTOs/MonthlyConsumption.dtos';

// utils
type Consume = 'energy_kwh' | 'water_m3' | 'gas_m3';



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
         // get monthlyConsumption - service
         const monthlyConsumptions = await monthlyConsumptionService.getMonthConsService();

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
   public async updateMonthCons(
      req: Request<{id: string}, {}, UpdateMonthlyConsumptionDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // id params
         const { id } = req.params;

         // update monthlyConsumption - service
         const monthlyConsumptions = await monthlyConsumptionService.updateMonthConsService(id, req.body);

         return res.status(200).json({
            success: true,
            message: '✔️ Update Monthly Consumption successfully',
            data: monthlyConsumptions
         });
      }
      catch(error){
         console.error('❌ Internal server error at Update Monthly Consumption: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Update Monthly Consumption',
            data: getErrorMessage(error)
         });
      }
   };


   // delete monthlyConsumption
   public async deleteMonthCons(
      req: Request<{id: string}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // id params
         const { id } = req.params;

         // delete monthlyConsumption - service
         await monthlyConsumptionService.deleteMonthConsService(id);

         return res.status(200).json({
            success: true,
            message: '✔️ Delete Monthly Consumption successfully'
         });
      }
      catch(error){
         console.error('❌ Internal server error at Delete Monthly Consumption: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Delete Monthly Consumption',
            data: getErrorMessage(error)
         });
      }
   };


   // get summary monthlyConsumption
   public async getMonthConsSummary(
      req: Request<{}, {}, {}, {q: Consume}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // consume params
         const { q } = req.query;

         // get monthlyConsumption summary - service
         const summary = await monthlyConsumptionService.getMonthConsSummaryService(q);

         return res.status(200).json({
            success: true,
            message: '✔️ Get Monthly Consumption Summary successfully',
            data: summary
         });
      }
      catch(error){
         console.error('❌ Internal server error at Get Monthly Consumption Summary: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Get Monthly Consumption Summary',
            data: getErrorMessage(error)
         });
      }
   };

};
export const monthlyConsumptionController: MonthlyConsumptionController = new MonthlyConsumptionController();