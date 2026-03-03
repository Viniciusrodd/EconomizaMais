
// imports
import { Response } from "express";

// import DTOs
import { 
   CreateSimulationDTO,
} from "@DTOs/Simulations.dtos";



// request mock
export const simulationsMockRequest = (
   body: CreateSimulationDTO | {},
   params?: string | {}
) => ({ // immediately returns a literal object
   body,
   params
});


// response mock
export const simulationsMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   
   return res;
};