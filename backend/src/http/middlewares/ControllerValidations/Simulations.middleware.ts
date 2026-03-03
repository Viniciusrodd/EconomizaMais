
// imports
import { body, param, ValidationChain } from 'express-validator';



// simulations creation
const createSimulationsValidation = (): ValidationChain[] => {
   return [
      // invalid target type
      body('target_type')
         .exists().withMessage('Tipo de simulação é obrigatório')
         .isString().withMessage('Tipo de simulação apenas em caracteres')
         .isIn([
            'energy', 'water', 'gas', 'all' 
         ]).withMessage('Tipo de simulação deve ser apenas: energia, água, gás ou tudo'),
      
      // invalid reduction percent   
      body('reduction_percent')
         .exists().withMessage('Porcentagem de redução é obrigatório')
         .isFloat({ min: 0, max: 100 }).withMessage('Porcentagem de redução deve estar entre 0 e 100')
         .toFloat(),
   ];
};


// simulations delete
const deleteSimulationsValidation = (): ValidationChain[] => {
   return [
      // invalid id
      param('id')
         .exists().withMessage('ID é obrigatório')
         .isUUID().withMessage('ID inválido'),
   ];
};


// export validations
export const simulationsValidations = {
   createSimulationsValidation,
   deleteSimulationsValidation
};