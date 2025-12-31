
// import DTOs
import { 
   CreateUserDTO, 
   UserResponseDTO,
   UpdateUserDTO
} from "@DTOs/User.dtos";

// import models
import { models } from "@root/infra/sequelize/Relations";



// class - user service
class UserService {

   // create user - public
   public async createUserService(
      userData: CreateUserDTO
   ): Promise<UserResponseDTO> {
      // validations
      const { name, residence_name, number_of_residents } = userData;
      if(!name || !residence_name || !number_of_residents){
         throw new Error('Todos os campos são necessários');
      }

      // check existing user counts
      const existingUserCount = await models.UserModel.count();
      if(existingUserCount > 0){
         throw new Error('Apenas 1 usuário é permitido por instalação');
      }
      
      // user DB creation
      const user = await models.UserModel.create({
         name,
         residence_name,
         number_of_residents
      });

      return user;    
   };


   // get user - public
   public async getUserService(): Promise<UserResponseDTO> {
      // get user - DB
      const user = await models.UserModel.findOne(); // because must have only 1 user, always
      if(!user) throw new Error('Usuário não encontrado');

      return user;
   };


   // update user - public
   public async updateUserService(
      userData: UpdateUserDTO
   ): Promise<UserResponseDTO> {
      // get user - DB
      const user = await models.UserModel.findOne();
      if (!user) throw new Error('Usuário não encontrado');

      await user.update(userData);
      return user;
   };


   // delete user - public
   public async deleteUserService(): Promise<void> {
      // get user - DB
      const user = await models.UserModel.findOne();
      if (!user) throw new Error('Usuário não encontrado');

      await user.destroy();
   };

};
export const userService: UserService = new UserService();