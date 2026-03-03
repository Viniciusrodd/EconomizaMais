
// models
import UserModel from "@models/User.model";
import TariffModel from "@models/Tariffs.model";
import SimulationModel from "@models/Simulations.model";
import MonthlyConsumptionModel from "@models/MonthlyConsumption.model";
import ExportHistoryModel from "@models/ExportHistory.model";
import AiInsightModel from "@models/aiInsights.model";



// 1 user can have 1 tariff
UserModel.hasOne(TariffModel, { 
   foreignKey: 'user_id', 
   onDelete: 'CASCADE' 
});
TariffModel.belongsTo(UserModel, { foreignKey: 'user_id' });


// 1 user can have many monthly consumption
UserModel.hasMany(MonthlyConsumptionModel, { 
   foreignKey: 'user_id', 
   as: 'monthlyConsumptions',
   onDelete: 'CASCADE' 
});
MonthlyConsumptionModel.belongsTo(UserModel, { foreignKey: 'user_id' });


// 1 user can have many simulations
UserModel.hasMany(SimulationModel, { 
   foreignKey: 'user_id', 
   as: 'simulations',
   onDelete: 'CASCADE' 
});
SimulationModel.belongsTo(UserModel, { foreignKey: 'user_id' });


// 1 user can have many ai insights
UserModel.hasMany(AiInsightModel, { 
   foreignKey: 'user_id', 
   as: 'aiInsights',   
   onDelete: 'CASCADE' 
});
AiInsightModel.belongsTo(UserModel, { foreignKey: 'user_id' });


// 1 user can have many export historys
UserModel.hasMany(ExportHistoryModel, { 
   foreignKey: 'user_id', 
   as: 'exportHistories',
   onDelete: 'CASCADE' 
});
ExportHistoryModel.belongsTo(UserModel, { foreignKey: 'user_id' });


// exporting models
export const models = {
   UserModel, TariffModel, SimulationModel,
   MonthlyConsumptionModel, ExportHistoryModel, AiInsightModel
};