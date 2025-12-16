
// imports
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";


// middleware
export const validate = (
   req: Request,
   res: Response,
   next: NextFunction
): Response | void => {
   // get errors
   const errors = validationResult(req);

   // without errors:
   if(errors.isEmpty()) return next();

   // with errors:
   const extractedErrors: Array<String> = [];
   errors.array().map((err) => extractedErrors.push(err.msg));
   
   return res.status(422).json({ 
      errors: extractedErrors 
   });
};