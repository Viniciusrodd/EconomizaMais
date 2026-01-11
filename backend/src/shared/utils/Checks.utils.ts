
// import interfaces
import { targetType } from './../dtos/Simulations.dtos';


// target type check
export const targetTypeCheck = (target_type: targetType) => {
   return target_type == 'energy' ? 'energia' 
   : target_type == 'water' ? 'água' 
   : target_type == 'gas' ? 'gás' 
   : target_type == 'all' ? 'todas as contas' 
   : ''
};