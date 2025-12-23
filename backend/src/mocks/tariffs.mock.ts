
// imports
import { Response } from "express";

// import DTOs
import { 
   CreateTariffDTO,
   UpdateTariffDTO
} from "@DTOs/Tariffs.dtos";


// request mock
export const tariffsMockRequest = (body: CreateTariffDTO | UpdateTariffDTO | {}) => ({ // immediately returns a literal object
   body
});


// response mock
export const tariffsMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   
   return res;
};