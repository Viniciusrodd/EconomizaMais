
// imports
import { DataTypes, Model, Optional } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { Tariff } from "@interfaces/Entities.interface";


// class - tariff model
class TariffModel extends Model<Tariff> {
   public id!: string;
   public userId!: string;
   public energyTariff!: number;
   public waterTariff!: number;
   public gasTariff!: number;
   public createdAt!: Date;
   public updatedAt!: Date;
};


// mapping
TariffModel.init({
   id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
   },
   userId: {
      type: DataTypes.CHAR(36),
      allowNull: false
   },
   energyTariff: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false
   },
   waterTariff: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false
   },
   gasTariff: {
      type: DataTypes.DECIMAL(10, 4),
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
   modelName: 'Tariff',
   timestamps: true,
   tableName: 'Tariffs'
});

export default TariffModel;