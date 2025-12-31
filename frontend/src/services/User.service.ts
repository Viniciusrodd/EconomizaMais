
// imports
import axios from "axios";

// import DTOs
import type { 
   CreateUserDTO, UserResponseDTO
} from '@DTOs/User.dtos';

// import routes
import { createUserRoute } from "@routes/user.routes";



// user service - frontend
class UserService {

   public async signIn(
      data: CreateUserDTO
   ): Promise<UserResponseDTO> {
      try{
         const res = await axios.post(createUserRoute, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };

};
export const userService: UserService = new UserService();