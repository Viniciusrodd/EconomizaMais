
// imports
import { Application, json, urlencoded } from "express";
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';

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
      this.securityMiddlewares(this.app);
      this.dataMiddlewaresConfig(this.app);
   };


   // security middlewares
   private securityMiddlewares(app: Application): void {
      app.use(hpp()); // prevents against "HTTP Parameter Pollution"
      app.use(helmet()); // safety config HTTP headers
      app.use(cors({
         origin: process.env.CLIENT_URL,
         credentials: true,
         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }));

      console.log('✔️ Security middlewares');
   };


   // data middlewares config
   private dataMiddlewaresConfig(app: Application): void {
      app.use(compression()); // compresses the data from HTTP responses
      app.use(json({ limit: '50mb' }));
      app.use(urlencoded({
         extended: true,
         limit: '50mb'
      }));

      console.log('✔️ Data middlewares');
   };   


   // start server
   private startServer(app: Application): void {
      app.listen(process.env.SERVER_PORT, () =>{
         console.log(
            '✔️ Server: ', 
            process.env.SERVER_PORT
         );
      });
   };
};