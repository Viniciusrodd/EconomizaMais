
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
   public reduction_percent!: number;
   public target_type!: SimulationTargetType;
   public monthly_saving!: number;
   public annual_saving!: number;
   public environmental_impact!: number;
   public feedback!: string;
   public created_at!: Date;
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
   reduction_percent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      get() {
         const value = this.getDataValue('reduction_percent');
         return value !== null ? Number(value) : null;
      }
   },
   target_type: {
      type: DataTypes.ENUM('energy', 'water', 'gas', 'all'),
      allowNull: false
   },
   monthly_saving: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      get() {
         const value = this.getDataValue('monthly_saving');
         return value !== null ? Number(value) : null;
      }      
   },
   annual_saving: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      get() {
         const value = this.getDataValue('annual_saving');
         return value !== null ? Number(value) : null;
      }      
   },
   environmental_impact: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
         const value = this.getDataValue('environmental_impact');
         return value !== null ? Number(value) : null;
      }      
   },
   feedback: {
      type: DataTypes.TEXT,
      allowNull: false
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'Simulation',
   timestamps: true,
   underscored: true, // Convert camelCase to snake_case automaticaly
   tableName: 'Simulations'
});


export default SimulationModel;