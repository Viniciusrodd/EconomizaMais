
// imports
import { body, param, query, ValidationChain } from 'express-validator';



// ai insights creation
const createAiInsightsValidation = (): ValidationChain[] => {
   return [
      // invalid consume type
      body('consume_type')
         .exists().withMessage('Tipo de consumo é obrigatório')
         .isString().withMessage('Tipo de consumo apenas em caracteres')
         .isIn([
            'energy', 'water', 'gas' 
         ]).withMessage('Tipo de consume deve ser apenas: energia, água ou gás'),

      // invalid category
      body('insight_category')
         .exists().withMessage('Categoria de insight é obrigatório')
         .isString().withMessage('Categoria de insight apenas em caracteres')
         .isIn([
            'tips', 'patterns', 'anomalies' 
         ]).withMessage('Categoria de insight deve ser apenas: dicas, padrões ou anomalias')
   ];
};


// get ai insights by category
const getAiInsightsValidation = (): ValidationChain[] => {
   return [
      // invalid category
      query('q')
         .exists().withMessage('Categoria de insight é obrigatório')
         .isString().withMessage('Categoria de insight apenas em caracteres')
         .isIn([
            'tips', 'patterns', 'anomalies' 
         ]).withMessage('Categoria de insight deve ser apenas: dicas, padrões ou anomalias')
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
   getAiInsightsValidation,
   deleteAiInsightsValidation
};