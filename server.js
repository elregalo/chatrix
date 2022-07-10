/**
 * @author - Moobi Kabelo
 * @date - 2022-07-10
 */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import ip from "ip";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on: http://${ip.address()}:${PORT}`);
});
