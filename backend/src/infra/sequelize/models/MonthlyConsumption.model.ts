
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
   public energyKwh!: number;
   public waterM3!: number;
   public gasM3!: number;
   public createdAt!: Date;
   public updatedAt!: Date;
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
   energyKwh: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
   },
   waterM3: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
   },
   gasM3: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
   },
   createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
   },
   updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'MonthlyConsumption',
   timestamps: true,
   tableName: 'MonthlyConsumptions'
});


export default MonthlyConsumptionModel;