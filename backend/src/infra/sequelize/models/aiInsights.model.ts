

// imports
import { DataTypes, Model } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { AIInsight } from '@interfaces/Entities.interface';
import type { AIInsightCategory } from '@interfaces/Entities.interface';



// class - ai-insight model
class AiInsightModel extends Model<AIInsight> {
   public id!: string;
   public userId!: string;
   public inputSummary!: string;
   public aiResponse!: number;
   public insightCategory!: AIInsightCategory;
   public createdAt!: Date;
};


// mapping
AiInsightModel.init({
   id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
   },
   userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
   },
   inputSummary: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   aiResponse: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   insightCategory: {
      type: DataTypes.ENUM('tips', 'patterns', 'anomalies'),
      allowNull: false,
   },
   createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'aiInsights',
   timestamps: true,
   tableName: 'aiInsights'
});


export default AiInsightModel;