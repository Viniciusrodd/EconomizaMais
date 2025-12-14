
// imports
import { DataTypes, Model } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { Simulation } from '@interfaces/Entities.interface';
import type { SimulationTargetType } from "@interfaces/Entities.interface";


// class - simulation model
class SimulationModel extends Model<Simulation> {
   public id!: string;
   public user_id!: string;
   public reductionPercent!: number;
   public targetType!: SimulationTargetType;
   public calculatedSaving!: number;
   public calculatedEnvironmentalImpact!: string;
   public createdAt!: Date;
};


// mapping
SimulationModel.init({
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
   reductionPercent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
   },
   targetType: {
      type: DataTypes.ENUM('energy', 'water', 'gas', 'all'),
      allowNull: false
   },
   calculatedSaving: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
   },
   calculatedEnvironmentalImpact: {
      type: DataTypes.STRING(255),
      allowNull: false
   },
   createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'Simulation',
   timestamps: true,
   tableName: 'Simulations'
});


export default SimulationModel;