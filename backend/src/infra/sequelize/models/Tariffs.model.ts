
// imports
import { DataTypes, Model } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { Tariff } from "@interfaces/Entities.interface";


// class - tariff model
class TariffModel extends Model<Tariff> {
   public id!: string;
   public user_id!: string;
   public energy_tariff!: number;
   public water_tariff!: number;
   public gas_tariff!: number;
   public created_at!: Date;
   public updated_at!: Date;
};


// mapping
TariffModel.init({
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
   energy_tariff: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      get() {
         const value = this.getDataValue('energy_tariff');
         return value !== null ? Number(value) : null;
      }
   },
   water_tariff: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      get() {
         const value = this.getDataValue('water_tariff');
         return value !== null ? Number(value) : null;
      }
   },
   gas_tariff: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      get() {
         const value = this.getDataValue('gas_tariff');
         return value !== null ? Number(value) : null;
      }
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'Tariff',
   timestamps: true,
   underscored: true, // Convert camelCase to snake_case automaticaly
   tableName: 'Tariffs'
});

export default TariffModel;