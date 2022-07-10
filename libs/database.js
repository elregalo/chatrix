/**
 * @author - Moobi Kabelo
 */
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("db", "username", "Mpassword", {
  host: "127.0.0.1",
  dialect: "mariadb",
});
