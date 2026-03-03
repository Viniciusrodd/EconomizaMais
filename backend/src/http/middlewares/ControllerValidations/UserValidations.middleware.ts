
// imports
import { body, ValidationChain } from 'express-validator';



// user creation
const userRegisterValidation = (): ValidationChain[] => {
   return [
      // invalid name
      body('name')
         .notEmpty().withMessage('Nome é obrigatório')
         .isString().withMessage('Nome apenas em caracteres')
         .isLength({ min: 4, max: 120 }).withMessage('Nome deve ser entre 4 e 120 caracteres')
         .trim(),

      // invalid residence name
      body('residence_name')
         .notEmpty().withMessage('Nome de residência é obrigatório')
         .isString().withMessage('Nome de residência apenas em caracteres')
         .isLength({ max: 150 }).withMessage('Nome de residência deve ter no máximo 150 caracteres')
         .trim(),

      // invalid number of residents
      body('number_of_residents')
         .notEmpty().withMessage('Número da residência é obrigatório')
         .isInt({ min: 1 }).withMessage('Número da residência deve ser no minímo 1')
         .toInt()
   ];
};


// user update
const userUpdateValidation = (): ValidationChain[] => {
   return [
      // invalid name
      body('name')
         .optional()
         .isString().withMessage('Nome deve ser em caracteres')
         .isLength({ min: 4, max: 120 }).withMessage('Nome deve ser entre 4 e 120 caracteres')
         .trim(),

      // invalid residence name
      body('residence_name')
         .optional()
         .isString().withMessage('Nome de residência deve ser em caracteres')
         .isLength({ max: 150 }).withMessage('Nome de residência deve ter no máximo 150 caracteres')
         .trim(),

      // invalid number of residents
      body('number_of_residents')
         .optional()
         .isInt({ min: 1 }).withMessage('Número da residência deve ser no minímo 1')
         .toInt()
   ];
};


// export validations
export const userValidations = {
   userRegisterValidation,
   userUpdateValidation
};