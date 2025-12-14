
// imports
import { DataTypes, Model, Optional } from "sequelize";
import { v4 } from "uuid";

// import connection
import { ConnectionDatabase } from "@config/database";

// import interfaces
import type { User } from '@interfaces/Entities.interface';


// class - user model
class UserModel extends Model<User> {
   public id!: string;
   public name!: string;
   public residenceName!: string;
   public numberOfResidents!: number;
   public createdAt!: Date;
   public updatedAt!: Date;
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
   residenceName: {
      type: DataTypes.STRING(150),
      allowNull: false
   },
   numberOfResidents: {
      type: DataTypes.INTEGER,
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
   modelName: 'User',
   timestamps: true,
   tableName: 'Users'
});


export default UserModel;