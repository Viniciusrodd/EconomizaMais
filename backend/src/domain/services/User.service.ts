
// imports


// import DTOs
import { 
   CreateUserDTO, 
   UserResponseDTO 
} from "@DTOs/User.dtos";

// import models
import { models } from "@root/infra/sequelize/Relations";


// user service - class
class UserService {

   // create user - public
   public async createUserService(
      userData: CreateUserDTO
   ): Promise<UserResponseDTO> {
      // validations
      if(!userData.name || !userData.residence_name || !userData.number_of_residents){
         throw new Error('❌ User data fields its required');
      }
      
      // user DB creation
      const user = await models.UserModel.create({
         name: userData.name,
         residence_name: userData.residence_name,
         number_of_residents: userData.number_of_residents
      });

      return user;    
   };

};
export const userService: UserService = new UserService();