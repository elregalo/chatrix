/**
 * @author - Moobi Kabelo
 */
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import ip from "ip";
import { authRouter } from "./routes/auth.routes.js";
import { indexRouter } from "./routes/routes.js";
import { sequelize } from "./libs/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("views/public/assets"));
app.use(helmet());
app.set("view engine", "ejs");

app.use(authRouter);
app.use(indexRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on: http://${ip.address()}:${PORT}`);
});
