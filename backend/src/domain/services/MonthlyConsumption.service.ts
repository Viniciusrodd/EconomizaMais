
// import DTOs
import { 
   CreateMonthlyConsumptionDTO,
   UpdateMonthlyConsumptionDTO,
   MonthlyConsumptionResponseDTO,
   MonthlyConsumptionSummaryDTO
} from '@DTOs/monthlyConsumption.dtos';

// import models
import { models } from "@root/infra/sequelize/Relations";



// class - MonthlyConsumption service
class MonthlyConsumptionService {

   // create monthlyConsumption - public
   public async createMonthConsService(
      monthCons: CreateMonthlyConsumptionDTO
   ): Promise<MonthlyConsumptionResponseDTO> {
      // validations
      const { user_id, year, month, energy_kwh, water_m3, gas_m3 } = monthCons;
      if(!user_id || !year || !month || !energy_kwh || !water_m3 || !gas_m3){
         throw new Error('All monthly consumption fields are required');
      }

      // get user id
      const user = await models.UserModel.findOne();
      if(!user){
         throw new Error('User not found');
      }

      // monthly consumption DB creation
      const monthlyConsumptions = await models.MonthlyConsumptionModel.create({
         user_id, year, month, energy_kwh, water_m3, gas_m3
      });

      return monthlyConsumptions;
   };


   // get monthlyConsumption - public
   
   
   // update monthlyConsumption - public


   // delete monthlyConsumption - public


   // get summary monthlyConsumption - public

};
export const monthlyConsumptionService: MonthlyConsumptionService = new MonthlyConsumptionService();