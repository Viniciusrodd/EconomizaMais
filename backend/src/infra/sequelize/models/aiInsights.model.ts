

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
   public user_id!: string;
   public input_summary!: string;
   public ai_response!: number;
   public insight_category!: AIInsightCategory;
   public created_at!: Date;
};


// mapping
AiInsightModel.init({
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
   input_summary: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   ai_response: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   insight_category: {
      type: DataTypes.ENUM('tips', 'patterns', 'anomalies'),
      allowNull: false,
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'aiInsights',
   timestamps: true,
   underscored: true, // Convert camelCase to snake_case automaticaly   
   tableName: 'aiInsights'
});


export default AiInsightModel;