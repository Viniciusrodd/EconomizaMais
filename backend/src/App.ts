
// imports
import express, { Express, Application } from "express";

// import server
import { Server } from '@root/server';


// class - app
class App {

   // initialize app
   public initialize(): void {
      // express / server - instances
      const app: Express = express();
      const server: Server = new Server(app);

      // start server
      server.start();
   };

};
const app: App = new App();
app.initialize();