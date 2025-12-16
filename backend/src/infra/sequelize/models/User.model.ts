
// imports
import { DataTypes, Model } from "sequelize";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { User } from '@interfaces/Entities.interface';


// class - user model
class UserModel extends Model<User> {
   public id!: string;
   public name!: string;
   public residence_name!: string;
   public number_of_residents!: number;
   public created_at!: Date;
   public updated_at!: Date;
};


// mapping
UserModel.init({
   id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
   },
   name: {
      type: DataTypes.STRING(120),
      allowNull: false
   },
   residence_name: {
      type: DataTypes.STRING(150),
      allowNull: false
   },
   number_of_residents: {
      type: DataTypes.INTEGER,
      allowNull: false
   }
}, {
   sequelize: ConnectionDatabase,
   modelName: 'User',
   timestamps: true,
   underscored: true, // Convert camelCase to snake_case automaticaly
   tableName: 'Users'
});


export default UserModel;