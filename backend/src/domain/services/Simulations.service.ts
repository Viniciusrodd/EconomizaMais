
// import DTOs
import {
   CreateSimulationDTO,
   SimulationResponseDTO
} from '@DTOs/Simulations.dtos';

// import models
import { models } from "@root/infra/sequelize/Relations";

// import services 
import { monthlyConsumptionService } from './MonthlyConsumption.service';
import { tariffService } from './Tariffs.service';
import { aiService } from './AiServices/AI.service';

// import entities
import { MonthlyConsumptionHistoryEntity } from '@entities/MonthlyConsumptionHistory.entity';
import { SimulationsEntities } from '@entities/Simulations.entity';

// import utils
import { Prompts } from '@utils/Prompts.utils';



// class - simulations service
class SimulationsService {

   // create simulations - public
   public async createSimulationsService(
      simulationsData: CreateSimulationDTO
   ): Promise<SimulationResponseDTO> {
      // validations
      const { target_type, reduction_percent } = simulationsData;
      if(!target_type || !reduction_percent){ 
         throw new Error('All simulations fields are required');
      }

      // get user id
      const user = await models.UserModel.findOne();
      if(!user){
         throw new Error('User not found');
      }

      // get monthly consumptions
      const consumptions = await monthlyConsumptionService.getAllMonthConsService();

      // get monthlyConsumptions entity
      const historyMonthlyConsumptions = new MonthlyConsumptionHistoryEntity(consumptions);

      // average consumption build
      const averageConsumption = {
         energy: historyMonthlyConsumptions.buildSummary('energy_kwh').average_consume,
         water: historyMonthlyConsumptions.buildSummary('water_m3').average_consume,
         gas: historyMonthlyConsumptions.buildSummary('gas_m3').average_consume,
      };

      // get tariffs
      const tariff = await tariffService.getTariffService();

      // tariff build
      const tariffs = {
         energy: tariff.energy_tariff,
         water: tariff.water_tariff,
         gas: tariff.gas_tariff
      };

      // get simulations entity
      const simulationEntity = new SimulationsEntities(
         simulationsData.target_type,
         simulationsData.reduction_percent,
         averageConsumption,
         tariffs
      );

      // monthly / annual saving
      const monthly_saving = simulationEntity.calculateMonthlySaving();
      const annual_saving = simulationEntity.calculateAnnualSaving();
      const environmental_impact = simulationEntity.calculateEnvironmentalImpact();

      // get environmental impact prompt
      const simulationPrompt = new Prompts();
      const prompt = simulationPrompt.environmentalImpactPrompt(simulationsData);

      // AI model request
      const feedback = await aiService.modelRequest(prompt, 'mistral');

      // simulations DB creation
      const simulations = await models.SimulationModel.create({
         user_id: user.id,
         reduction_percent, 
         target_type,
         monthly_saving,
         annual_saving,
         environmental_impact,
         feedback
      });

      return simulations;
   };


   // get simulations - public
   public async getSimulationsService(): Promise<SimulationResponseDTO[]> {
      // get simulations - DB
      const simulations = await models.SimulationModel.findAll();
      if(simulations.length <= 0) throw new Error('Simulations not found');

      return simulations;
   };


   // delete simulation - public
   public async deleteSimulationService(
      id: string
   ): Promise<void> {
      // get simulation
      const simulation = await models.SimulationModel.findByPk(id);
      if(!simulation) throw new Error('Simulation not found');

      await simulation.destroy();
   };

};
export const simulationsService: SimulationsService = new SimulationsService();