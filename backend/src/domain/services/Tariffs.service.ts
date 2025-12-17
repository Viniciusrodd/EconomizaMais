
// import DTOs
import { 
   CreateTariffDTO,
   TariffResponseDTO,
   UpdateTariffDTO
} from '@DTOs/Tariffs.dtos';

// import models
import { models } from "@root/infra/sequelize/Relations";



// class - tariff service
class TariffService {

   // create tariff - public
   public async createTariff(
      tariffData: CreateTariffDTO
   ): Promise<TariffResponseDTO> {
      // validations
      const { energy_tariff, water_tariff, gas_tariff } = tariffData;
      if(!energy_tariff || !water_tariff || !gas_tariff){
         throw new Error('❌ All tariff fields are required');
      }

      // check existing tariffs
      const existingTariffCount = await models.TariffModel.count();
      if(existingTariffCount > 0){
         throw new Error('❌ Only one tariffs is allowed per installation');
      }

      // tariff DB creation
      const tariffs = await models.TariffModel.create({
         energy_tariff,
         water_tariff,
         gas_tariff
      });

      return tariffs;
   };


   // get tariff - public


   // update tariff - public

};
export const tariffService: TariffService = new TariffService();