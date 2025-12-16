
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
   public calculated_saving!: number;
   public calculated_environmental_impact!: string;
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
      allowNull: false
   },
   target_type: {
      type: DataTypes.ENUM('energy', 'water', 'gas', 'all'),
      allowNull: false
   },
   calculated_saving: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
   },
   calculated_environmental_impact: {
      type: DataTypes.STRING(255),
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