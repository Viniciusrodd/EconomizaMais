
// imports
import { Router } from "express";

// import routes
import { userRoutes } from "./user.routes";
import { tariffsRoutes } from "./tariff.routes";

// router
export const routes: Router = Router();


// use routes
routes.use('/users', userRoutes);
routes.use('/tariffs', tariffsRoutes);