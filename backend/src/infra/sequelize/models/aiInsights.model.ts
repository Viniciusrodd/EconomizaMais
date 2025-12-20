

// imports
import { DataTypes, Model } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { AIInsight } from '@interfaces/Entities.interface';
import type { AIInsightCategory, AIInsightConsumeType } from '@interfaces/Entities.interface';



// class - ai-insight model
class AiInsightModel extends Model<AIInsight> {
   public id!: string;
   public user_id!: string;
   public input_summary!: string;
   public ai_response!: string;
   public insight_category!: AIInsightCategory;
   public consume_type!: AIInsightConsumeType;
   public created_at!: Date;
   public updated_at!: Date;
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
   },
   consume_type: {
      type: DataTypes.ENUM('energy', 'water', 'gas'),
      allowNull: false,
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'ai_insight',
   timestamps: true,
   underscored: true, // Convert camelCase to snake_case automaticaly   
   tableName: 'ai_insights'
});


export default AiInsightModel;