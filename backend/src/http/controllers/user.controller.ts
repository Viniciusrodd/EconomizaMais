
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@interfaces/ApiResponse.interface";

// import services
import { userService } from "@services/User.service";

// import DTOs
import { 
   CreateUserDTO, 
   UpdateUserDTO, 
   UserResponseDTO 
} from "@DTOs/User.dtos";



// class - user controller
class UserController {

   // create user
   public async createUser(
      req: Request<{}, {}, CreateUserDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{         
         // create user - service
         const user: UserResponseDTO = await userService.createUserService(req.body);
   
         return res.status(201).json({
            success: true,
            message: '✔️ User successfully created',
            data: user
         });
      }
      catch(error){
         console.error('❌ Internal server error at User creation: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at User creation',
            data: error
         });
      }
   };


   // get user
   public async getUser(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         // get user - service
         const user: UserResponseDTO = await userService.getUserService();
   
         return res.status(200).json({
            success: true,
            message: '✔️ User get successfully',
            data: user
         });
      }
      catch(error){
         console.error('❌ Internal server error at Get user: ', error);
         return res.status(500).json({
            success: false,
            message: '❌ Internal server error at Get user',
            data: error
         });
      }
   };

};
export const userController: UserController = new UserController();