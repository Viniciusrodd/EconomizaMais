
// imports
import { Router } from "express";

// import routes
import { userRoutes } from "./user.routes";

// router
export const routes: Router = Router();


// use routes
routes.use('/users', userRoutes);