/**
 * @author - Moobi Kabelo
 */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import ip from "ip";
import { indexRouter } from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views/public/assets"));
app.set("view engine", "ejs");

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on: http://${ip.address()}:${PORT}`);
});
