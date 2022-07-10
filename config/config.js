/**
 * @author - Moobi Kabelo
 */
import dotenv from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const speakeasy = require("speakeasy");

dotenv.config();

export const config = {
  auth: {
    bcryptSalt: 12,
    jwtSecKey: speakeasy.generateSecret({ length: 20 }).base32,
    expiresIn: new Date(Date.now() + 60 * 60 * 1000), // 1hr
  },
  database: {
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
