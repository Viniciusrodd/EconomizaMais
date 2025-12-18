
// imports
import { Request, Response, NextFunction } from "express";


// logging middleware
export function loggingMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
): void {
   // start
   const start = Date.now();

   res.on('finish', () =>{ // ".on()" - event listener, for when response its complete sended (finish)
      const time = Date.now() - start;
      console.log(`📥 ${ req.method } ${ req.originalUrl } → ${ res.statusCode } [${ time }ms]`);
   });

   next();
};