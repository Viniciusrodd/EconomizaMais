
// imports
import { body, param, query, ValidationChain } from 'express-validator';


// export history creation
const downloadHistoryValidation = (): ValidationChain[] => {
   return [
      // invalid pdf path
      body('pdf_path')
         .exists().withMessage('Caminho de PDF é obrigatório')
         .isString().withMessage('Caminho de PDF apenas em characteres')
         .contains('.pdf').withMessage('Caminho apenas em PDF'),

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