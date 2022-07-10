/**
 * @author - Moobi Kabelo
 */
import { DataTypes } from "sequelize";
import { sequelize } from "../libs/database.js";

export const User = sequelize.define(
  "User",
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullNames: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

(async () => {
  await User.sync();
})();
