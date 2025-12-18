
// imports
import { Application, json, urlencoded } from "express";
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';

// import routes
import { routes } from "@routes/index.routes";

// import database connection 
import { ConnectionDatabase } from '@config/database';

// import middlewares
import { loggingMiddleware } from '@middlewares/Logging.middleware';

// import env
import dotenv from 'dotenv';
dotenv.config({});



// class - server
export class Server {
   // properties
   private app: Application;


   // constructor
   constructor(app: Application){
      this.app = app;
   };


   // start methods
   public async start(): Promise<void> {
      // database
      await this.databaseAuthentication();

      // server configs
      this.startServer(this.app);
      this.securityMiddlewares(this.app);
      this.dataMiddlewaresConfig(this.app);
      this.customMiddlewares(this.app);
      this.routerConfig(this.app);
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
   
   
   // custom middlewares
   private customMiddlewares(app: Application): void {
      app.use(loggingMiddleware); // logging mid
      console.log('✔️ Custom middlewares');
   };


   // route config
   private routerConfig(app: Application): void {
      app.use('/api', routes); // index routes

      console.log('✔️ routes');
   };

   
   // connection authenticate
   private async databaseAuthentication(): Promise<void> {
      try{
         await ConnectionDatabase.authenticate();
         console.log('✔️ Database authentication');

         ConnectionDatabase.sync();
         console.log('✔️ Database synchronization');
      }
      catch(error){
         console.error('❌ Database authentication error: ', error);
         process.exit(1); // close app if database doesn't connect
      }
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