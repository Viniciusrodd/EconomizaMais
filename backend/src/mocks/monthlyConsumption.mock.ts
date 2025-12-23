
// imports
import { Response } from "express";

// import DTOs
import { 
   CreateMonthlyConsumptionDTO,
   UpdateMonthlyConsumptionDTO
} from "@DTOs/MonthlyConsumption.dtos";

// utils
type Consume = 'energy_kwh' | 'water_m3' | 'gas_m3';


// request mock
export const monthConsMockRequest = (
   body: CreateMonthlyConsumptionDTO | UpdateMonthlyConsumptionDTO | {},
   params?: string | {},
   q?: Consume
) => ({ // immediately returns a literal object
   body,
   params,
   query: { q }
});


// response mock
export const monthConsMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   
   return res;
};