
// imports
import axios from "axios";

// import DTOs
import type { 
   CreateUserDTO, 
   UserResponseDTO,
   UpdateUserDTO
} from '@DTOs/User.dtos';

// import routes
import { userRoute } from "@routes/routes";



// user service - frontend
class UserService {

   // register user
   public async signIn(
      data: CreateUserDTO
   ): Promise<UserResponseDTO> {
      try{
         const res = await axios.post(userRoute, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get user
   public async getUser(): Promise<UserResponseDTO> {
      try{
         const res = await axios.get(userRoute);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };
   
   
   // update user
   public async updateUser(
      data: UpdateUserDTO
   ): Promise<UserResponseDTO> {
      try{
         const res = await axios.put(userRoute, data);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   }; 


   // delete user
   public async deleteUser(): Promise<UserResponseDTO> {
      try{
         const res = await axios.delete(userRoute);
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