
// imports
import { Response } from "express";

// import DTOs
import { 
   CreateAIInsightDTO
} from "@DTOs/aiInsights.dtos";



// request mock
export const aiInsightsMockRequest = (
   body: CreateAIInsightDTO | {},
   params?: string | {},
   q?: string
) => ({ // immediately returns a literal object
   body,
   params,
   query: { q }
});


// response mock
export const aiInsightsMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   
   return res;
};