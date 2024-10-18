import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PORT } from "../utils/conifg";
import { AppDataSource } from "../utils/data-source";

const cors = require("cors");
const userRoute = require("../routes/UserRouter");

dotenv.config();
const app = express();
const port = PORT || 4545;
AppDataSource.initialize();
app.use(express.json());
app.use("*", cors());

app.use("/api", userRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, From our backend");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
