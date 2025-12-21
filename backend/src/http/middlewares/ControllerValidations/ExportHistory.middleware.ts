
// imports
import { body, param, query, ValidationChain } from 'express-validator';


// export history creation
const downloadHistoryValidation = (): ValidationChain[] => {
   return [
      // invalid id
      param('id')
         .exists().withMessage('ID é obrigatório')
         .isUUID().withMessage('ID inválido'),
   ];
};


// export validations
export const historyValidations = {
   downloadHistoryValidation
};