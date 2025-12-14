
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
   public filePath!: string;
   public exportedAt!: Date;
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
   filePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
   },
   exportedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'ExportHistory',
   timestamps: true,
   tableName: 'ExportHistorys'
});


export default ExportHistoryModel;