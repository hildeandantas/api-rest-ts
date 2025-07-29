import { DataTypes, Model } from "sequelize";
import { db } from "../config/database";
import BcryptUtil from "../utils/bcrypt";

class User extends Model {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value: string) {
        this.setDataValue("email", value.toLowerCase());
      },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      validate: {
        len: [6, 100],
      },
      set(value: string) {
        this.setDataValue("password", value);
      },
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
    sequelize: db,
    modelName: "User",
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await BcryptUtil.hashPassword(user.password);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          user.password = await BcryptUtil.hashPassword(user.password);
        }
      },
    },
  }
);

export default User;
