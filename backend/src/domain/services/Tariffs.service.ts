
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
   public async createTariffService(
      tariffData: CreateTariffDTO
   ): Promise<TariffResponseDTO> {
      // validations
      const { energy_tariff, water_tariff, gas_tariff } = tariffData;
      if(!energy_tariff || !water_tariff || !gas_tariff){
         throw new Error('All tariff fields are required');
      }

      // check existing tariffs
      const existingTariffCount = await models.TariffModel.count();
      if(existingTariffCount > 0){
         throw new Error('Only one tariffs is allowed per installation');
      }

      // get user id
      const user = await models.UserModel.findOne({
         attributes: ['id']
      });
      if(!user){
         throw new Error('User not found');
      }

      // tariff DB creation
      const tariffs = await models.TariffModel.create({
         user_id: user!.id,
         energy_tariff,
         water_tariff,
         gas_tariff
      });

      return tariffs;
   };


   // get tariff - public
   public async getTariffService(): Promise<TariffResponseDTO> {
      // get tariff - DB
      const tariffs = await models.TariffModel.findOne(); // because must have only 1 tariffs per user, always
      if(!tariffs) throw new Error('Tariffs fot found');

      return tariffs;
   };
   

   // update tariff - public
   public async updateTariffService(
      tariffData: UpdateTariffDTO
   ): Promise<TariffResponseDTO> {
      // get tariff - DB
      const tariffs = await models.TariffModel.findOne();
      if (!tariffs) throw new Error('Tariffs not found');

      await tariffs.update(tariffData);
      return tariffs;
   };

};
export const tariffService: TariffService = new TariffService();