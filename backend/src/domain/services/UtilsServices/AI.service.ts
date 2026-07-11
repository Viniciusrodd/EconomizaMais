
// imports
import axios from "axios";

// import env
import dotenv from 'dotenv';
dotenv.config({});

// import utils
import { getErrorMessage } from "@utils/ErrorHandler.util";


// class - AI service
class AiService {

   public async modelRequest(
      prompt: string
   ): Promise<string> {
      // validations
      if(!prompt) throw new Error('Prompt for AI model request is necessary');

      try{
         // get model response
         const modelResponse = await axios.post(process.env.OLLAMA_URL as string, {
            'model': process.env.OLLAMA_MODEL,
            'prompt': prompt,
            'stream': false
         });

         // get result
         const result = typeof modelResponse.data === 'string'
            ? modelResponse.data
            : modelResponse.data.response;
         if(!result) throw new Error('Empty response from AI model');
            
         return result.trim();
      }
      catch(error){
         console.error('[AIService] Error while requesting local AI model:', getErrorMessage(error));
         throw new Error('Failed to process AI model request');
      }
   };

};
export const aiService: AiService = new AiService();