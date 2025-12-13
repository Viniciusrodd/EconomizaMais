
// imports
import { Application } from "express";

// import env
import dotenv from 'dotenv';
dotenv.config({});


// class - server
export class Server {
   // express instance
   private app: Application;

   // constructor
   constructor(app: Application){
      this.app = app;
   };


   // start methods
   public start(): void {
      this.startServer(this.app);
   };


   // start server
   private startServer(app: Application): void {
      app.listen(process.env.SERVER_PORT, () =>{
         console.log(
            '✔️ Server running at port: ', 
            process.env.SERVER_PORT
         );
      });
   };
};