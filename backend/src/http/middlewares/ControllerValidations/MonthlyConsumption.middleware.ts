
// imports
import { body, param, query, ValidationChain } from 'express-validator';



// monthlyConsumption creation
const createMonthlyConsValidation = (): ValidationChain[] => {
   return [
      // invalid year
      body('year')
         .exists().withMessage('Ano do consumo é obrigatório')
         .isInt({ 
            min: new Date().getFullYear(),
            max: new Date().getFullYear()
         }).withMessage('Ano não deve ser menor ou maior que o atual')
         .toInt(),
      
      // invalid month
      body('month')
         .exists().withMessage('Mês do consumo é obrigatório')
         .isInt({ 
            min: 1,
            max: 12
         }).withMessage('Mês não deve ser menor que 1 ou maior que 12')
         .toInt(),

      // invalid energy
      body('energy_kwh')
         .exists().withMessage('Kwh de energia é obrigatório')
         .isFloat({ min: 0 }).withMessage('Kwh de energia deve ser no minímo 0')
         .toFloat(),

      // invalid water
      body('water_m3')
         .exists().withMessage('M3 de água é obrigatório')
         .isFloat({ min: 0 }).withMessage('M3 de água deve ser no minímo 0')
         .toFloat(),

      // invalid gas
      body('gas_m3')
         .exists().withMessage('M3 de gás é obrigatório')
         .isFloat({ min: 0 }).withMessage('M3 de gás deve ser no minímo 0')
         .toFloat()   
   ];
};


// monthlyConsumption update
const updateMonthlyConsValidation = (): ValidationChain[] => {
   return [
      // invalid id
      param('id')
         .exists().withMessage('ID é obrigatório')
         .isUUID().withMessage('ID inválido'),

      // invalid energy
      body('energy_kwh')
         .optional()         
         .isFloat({ min: 0 }).withMessage('Kwh de energia deve ser no minímo 0')
         .toFloat(),

      // invalid water
      body('water_m3')
         .optional()         
         .isFloat({ min: 0 }).withMessage('M3 de água deve ser no minímo 0')
         .toFloat(),

      // invalid gas
      body('gas_m3')
         .optional()         
         .isFloat({ min: 0 }).withMessage('M3 de gás deve ser no minímo 0')
         .toFloat()   
   ];
};


// monthlyConsumption delete
const deleteMonthlyConsValidation = (): ValidationChain[] => {
   return [
      // invalid id
      param('id')
         .exists().withMessage('ID é obrigatório')
         .isUUID().withMessage('ID inválido'),
   ];
};


// get monthlyConsumption summary
const getMonthlyConsSummaryValidation = (): ValidationChain[] => {
   return [
      // invalid consume
      query('q')
         .isString().withMessage('Consumo deve ser em caracteres')
         .isIn([
            'energy_kwh', 'water_m3', 'gas_m3'
         ]).withMessage('Consumo deve ser apenas energia, água ou gás')
   ];
};


// export validations
export const monthlyConsumptionValidations = {
   createMonthlyConsValidation,
   updateMonthlyConsValidation,
   deleteMonthlyConsValidation,
   getMonthlyConsSummaryValidation
};