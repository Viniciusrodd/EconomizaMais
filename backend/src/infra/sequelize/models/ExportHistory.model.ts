
// imports
import { DataTypes, Model } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { ExportHistory } from '@interfaces/Entities.interface';


// class - export history model
class ExportHistoryModel extends Model<ExportHistory> {
   public id!: string;
   public user_id!: string;
   public file_path!: string;
   public exported_at!: Date;
};


// mapping
ExportHistoryModel.init({
   id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
   },
   user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
   },
   file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'Export_history',
   timestamps: true,
   underscored: true, // Convert camelCase to snake_case automaticaly   
   tableName: 'Export_history'
});


export default ExportHistoryModel;