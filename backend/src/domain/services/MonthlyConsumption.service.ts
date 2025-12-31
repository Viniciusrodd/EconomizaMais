
// import DTOs
import { 
   CreateMonthlyConsumptionDTO,
   UpdateMonthlyConsumptionDTO,
   MonthlyConsumptionResponseDTO,
   MonthlyConsumptionSummaryDTO
} from '@DTOs/monthlyConsumption.dtos';

// import interfaces
import { MonthlyConsumption } from '@interfaces/Entities.interface';

// import models
import { models } from "@root/infra/sequelize/Relations";

// import entity
import { MonthlyConsumptionHistoryEntity } from '@entities/MonthlyConsumptionHistory.entity';


// utils
type Consume = 'energy_kwh' | 'water_m3' | 'gas_m3';


// class - MonthlyConsumption service
class MonthlyConsumptionService {

   // create monthlyConsumption - public
   public async createMonthConsService(
      monthCons: CreateMonthlyConsumptionDTO
   ): Promise<MonthlyConsumptionResponseDTO> {
      // validations
      const { year, month, energy_kwh, water_m3, gas_m3 } = monthCons;
      if(!year || !month || !energy_kwh || !water_m3 || !gas_m3){
         throw new Error('Todos os campos são necessários');
      }

      // get user id
      const user = await models.UserModel.findOne({
         attributes: ['id']
      });
      if(!user){
         throw new Error('Usuário não encontrado');
      }

      // monthly consumption DB creation
      const monthlyConsumptions = await models.MonthlyConsumptionModel.create({
         user_id: user.id, year, month, energy_kwh, water_m3, gas_m3
      });

      return monthlyConsumptions;
   };


   // get monthlyConsumption - public
   public async getMonthConsService(): Promise<MonthlyConsumptionResponseDTO[]> {
      // get monthlyConsumption
      const monthlyConsumptions = await models.MonthlyConsumptionModel.findAll();
      if(monthlyConsumptions.length <= 0) throw new Error('Meses de consumo não encontrados');

      return monthlyConsumptions;
   };
   
   
   // update monthlyConsumption - public
   public async updateMonthConsService(
      id: string,
      monthCons: UpdateMonthlyConsumptionDTO
   ): Promise<MonthlyConsumptionResponseDTO> {
      // get monthly consumption
      const monthlyConsumption = await models.MonthlyConsumptionModel.findByPk(id);
      if(!monthlyConsumption) throw new Error('Mês de consumo não encontrado');

      await monthlyConsumption.update(monthCons);
      return monthlyConsumption;
   };


   // delete monthlyConsumption - public
   public async deleteMonthConsService(id: string): Promise<void> {
      // get monthly consumption
      const monthlyConsumption = await models.MonthlyConsumptionModel.findByPk(id);
      if(!monthlyConsumption) throw new Error('Mês de consumo não encontrado');

      await monthlyConsumption.destroy();
   };


   // get summary monthlyConsumption - public
   public async getMonthConsSummaryService(
      consume: Consume
   ): Promise<MonthlyConsumptionSummaryDTO> {
      // get all monthlyConsumptions
      const monthlyConsumptions = await models.MonthlyConsumptionModel.findAll();
      if(monthlyConsumptions.length <= 0) throw new Error('Meses de consumo não encontrados');

      // MonthlyConsumptionHistoryEntity initialize
      const monthlyConsumptionHistoryEntity = new MonthlyConsumptionHistoryEntity(monthlyConsumptions);

      // summary
      const summary = monthlyConsumptionHistoryEntity.buildSummary(consume);

      return summary;
   };


   // get all monthlyConsumption - public
   public async getAllMonthConsService(): Promise<MonthlyConsumption[]> {
      // get all monthlyConsumptions
      const monthlyConsumptions = await models.MonthlyConsumptionModel.findAll();
      if(monthlyConsumptions.length <= 0) throw new Error('Meses de consumo não encontrados');

      return monthlyConsumptions;
   };

};
export const monthlyConsumptionService: MonthlyConsumptionService = new MonthlyConsumptionService();