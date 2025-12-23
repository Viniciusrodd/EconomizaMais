
// imports
import { Response } from "express";

// import DTOs
import { 
   CreateUserDTO, 
   UpdateUserDTO, 
} from "@DTOs/User.dtos";


// request mock
export const userMockRequest = (body: CreateUserDTO | UpdateUserDTO) => ({ // immediately returns a literal object
   body
});


// response mock
export const userMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   
   return res;
};