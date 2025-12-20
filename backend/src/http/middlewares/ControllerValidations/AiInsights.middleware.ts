
// imports
import { body, param, ValidationChain } from 'express-validator';


// ai insights creation
const createAiInsightsValidation = (): ValidationChain[] => {
   return [
      // invalid consume type
      body('consume_type')
         .exists().withMessage('Tipo de consumo é obrigatório')
         .isString().withMessage('Tipo de consumo apenas em characteres')
         .isIn([
            'energy', 'water', 'gas' 
         ]).withMessage('Tipo de consume deve ser apenas: energia, água, gás'),

      // invalid category
      body('insight_category')
         .exists().withMessage('Categoria de insight é obrigatório')
         .isString().withMessage('Categoria de insight apenas em characteres')
         .isIn([
            'tips', 'patterns', 'anomalies' 
         ]).withMessage('Categoria de insight deve ser apenas: tips, patterns, anomalies')
   ];
};


// ai insights delete
const deleteAiInsightsValidation = (): ValidationChain[] => {
   return [
      // invalid id
      param('id')
         .exists().withMessage('ID é obrigatório')
         .isUUID().withMessage('ID inválido'),
   ];
};


// export validations
export const aiInsightsValidations = {
   createAiInsightsValidation,
   deleteAiInsightsValidation
};