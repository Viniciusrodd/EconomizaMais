
// imports
import { Response } from "express";


// request mock
export const aiInsightsMockRequest = (
   body: {},
   params?: string | {}
) => ({ // immediately returns a literal object
   body,
   params
});


// response mock
export const aiInsightsMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   
   return res;
};