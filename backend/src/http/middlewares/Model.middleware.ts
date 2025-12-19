
// imports
import { Request, Response, NextFunction } from "express";
import axios from "axios";

// import env
import dotenv from 'dotenv';
dotenv.config({});


// IA model (ollama mistral) middleware check
export async function modelMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | Response> {
   try{
      await axios.get(process.env.OLLAMA_CHECK_URL!, { timeout: 0 });
      next();
   }
   catch(error){
      console.log('⚠️ IA model service is offline or inaccessible');
      return res.status(503).json({
         success: false,
         message: '⚠️ IA model service is offline or inaccessible',
      });
   }
};