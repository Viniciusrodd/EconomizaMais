
// imports
import { Router } from "express";

// import routes
import { userRoutes } from "./user.routes";
import { tariffsRoutes } from "./tariff.routes";
import { monthConsRoutes } from "./monthlyConsumption.routes";
import { simulationsRoutes } from "./simulations.routes";
import { aiInsightsRoutes } from "./aiInsights.routes";
import { exportHistoryRoutes } from "./exportHistory.routes";


// router
export const routes: Router = Router();


// use routes
routes.use('/users', userRoutes);
routes.use('/tariffs', tariffsRoutes);
routes.use('/monthCons', monthConsRoutes);
routes.use('/simulations', simulationsRoutes);
routes.use('/aiInsights', aiInsightsRoutes);
routes.use('/export', exportHistoryRoutes);