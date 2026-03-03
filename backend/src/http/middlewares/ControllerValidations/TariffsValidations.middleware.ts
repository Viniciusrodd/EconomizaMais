
// imports
import { body, ValidationChain } from 'express-validator';



// tariff creation
const tariffCreationValidation = (): ValidationChain[] => {
   return [
      // invalid energy_tariff
      body('energy_tariff')
         .exists().withMessage('Tarifa de energia é obrigatório')
         .isFloat({ min: 0 }).withMessage('Tarifa de energia deve ser no minímo 0')
         .toFloat(),

      // invalid water_tariff
      body('water_tariff')
         .exists().withMessage('Tarifa de água é obrigatório')
         .isFloat({ min: 0 }).withMessage('Tarifa de água deve ser no minímo 0')
         .toFloat(),

      // invalid gas_tariff
      body('gas_tariff')
         .exists().withMessage('Tarifa de gás é obrigatório')
         .isFloat({ min: 0 }).withMessage('Tarifa de gás deve ser no minímo 0')
         .toFloat()   
   ];
};


// tariffs update
const tariffsUpdateValidations = (): ValidationChain[] => {
   return [
      // invalid energy_tariff
      body('energy_tariff')
         .optional()
         .isFloat({ min: 0 }).withMessage('Tarifa de energia deve ser no minímo 0')
         .toFloat(),

      // invalid water_tariff
      body('water_tariff')
         .optional()
         .isFloat({ min: 0 }).withMessage('Tarifa de água deve ser no minímo 0')
         .toFloat(),

      // invalid gas_tariff
      body('gas_tariff')
         .optional()
         .isFloat({ min: 0 }).withMessage('Tarifa de gás deve ser no minímo 0')
         .toFloat()  
   ];
};


// export validations
export const tariffsValidations = {
   tariffCreationValidation,
   tariffsUpdateValidations
};