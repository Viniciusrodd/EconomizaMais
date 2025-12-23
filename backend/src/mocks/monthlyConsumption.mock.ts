
// imports
import { Response } from "express";

// import DTOs
import { 
   CreateMonthlyConsumptionDTO,
   UpdateMonthlyConsumptionDTO
} from "@DTOs/MonthlyConsumption.dtos";


// request mock
export const monthConsMockRequest = (body: CreateMonthlyConsumptionDTO | UpdateMonthlyConsumptionDTO | {}) => ({ // immediately returns a literal object
   body
});


// response mock
export const monthConsMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   
   return res;
};