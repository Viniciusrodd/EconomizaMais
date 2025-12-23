
// imports
import { Response } from "express";


// request mock
export const historyMockRequest = (
   body: {},
   params?: string | {}
) => ({ // immediately returns a literal object
   body,
   params
});


// response mock
export const historyMockResponse = (): Response => {
   const res: Response = {} as Response; // empty object "pretending" being a Response

   res.status = jest.fn().mockReturnValue(res); // "fn()" its a "simulate function"
   res.json = jest.fn().mockReturnValue(res);
   res.download = jest.fn().mockReturnThis();

   return res;
};