
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
      if(!userData.name || !userData.residenceName || !userData.numberOfResidents){
         throw new Error('❌ User data fields its required');
      }
      
      const user = await models.UserModel.create({
         name: userData.name,
         residenceName: userData.residenceName,
         numberOfResidents: userData.numberOfResidents
      });

      return user;    
   };

};
export const userService: UserService = new UserService();