
// imports
import { body, param, ValidationChain } from 'express-validator';


// user creation
const userRegisterValidation = (): ValidationChain[] => {
   return [
      // invalid name
      body('name')
         .notEmpty().withMessage('Name is required')
         .isString().withMessage('Name must be a string')
         .isLength({ min: 4, max: 120 }).withMessage('Name must be between 4 and 120 characters')
         .trim(),

      // invalid residence name
      body('residence_name')
         .notEmpty().withMessage('Residence name is required')
         .isString().withMessage('Residence name must be a string')
         .isLength({ max: 120 }).withMessage('Residence name must have maximum 150 characteres')
         .trim(),

      // invalid number of residents
      body('number_of_residents')
         .notEmpty().withMessage('Number of residents is required')
         .isInt({ min: 1 }).withMessage('Number of residents must be at least 1')
         .toInt()
   ];
};



// export
export const validations = {
   userRegisterValidation,
};