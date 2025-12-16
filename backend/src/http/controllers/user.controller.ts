
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@interfaces/ApiResponse.interface";

// import DTOs
import { 
   CreateUserDTO, 
   UpdateUserDTO, 
   UserResponseDTO 
} from "@DTOs/User.dtos";



// class - user controller
class UserController {

   // create user
   async createUser(
      req: Request<{}, {}, CreateUserDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const { name, residenceName, numberOfResidents } = req.body;
         
         // call service...
         // const user: UserResponseDTO = await service(name, residenceName, numberOfResidents);
   
         return res.status(201).json({
            success: true,
            message: '✔️ User successfully created'
         })
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

};
export const userController: UserController = new UserController();