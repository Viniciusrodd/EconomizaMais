
// imports
import { DataTypes, Model } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { MonthlyConsumption } from '@interfaces/Entities.interface';



// class - Monthly Consumption model
class MonthlyConsumptionModel extends Model<MonthlyConsumption> {
   public id!: string;
   public user_id!: string;
   public year!: number;
   public month!: number;
   public energy_kwh!: number;
   public water_m3!: number;
   public gas_m3!: number;
   public created_at!: Date;
   public updated_at!: Date;
};


// mapping
MonthlyConsumptionModel.init({
   id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
   },
   user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
   },
   year: {
      type: DataTypes.INTEGER,
      allowNull: false      
   },
   month: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   energy_kwh: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
         const value = this.getDataValue('energy_kwh');
         return value !== null ? Number(value) : null;
      }      
   },
   water_m3: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
         const value = this.getDataValue('water_m3');
         return value !== null ? Number(value) : null;
      }
   },
   gas_m3: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
         const value = this.getDataValue('gas_m3');
         return value !== null ? Number(value) : null;
      }
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'Monthly_consumption',
   timestamps: true,
   underscored: true, // Convert camelCase to snake_case automaticaly   
   tableName: 'Monthly_consumptions'
});


export default MonthlyConsumptionModel;