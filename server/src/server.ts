import express, { Request, Response } from "express";
import dotenv from "dotenv";
import DBPostgresSql_Connection from "../utils/dbConnect_Postgres";
import DatabaseConnection from "../utils/mongoDBconnection";
const cors = require("cors");
dotenv.config();
const app = express();
const port = process.env.PORT || 4545;
const dbPostgresSql = new DBPostgresSql_Connection();
const mongoDbCon = new DatabaseConnection();
app.use("*", cors());
(async () => {
  try {
    await mongoDbCon.connect();
    await dbPostgresSql.connect();
    console.log("database is Connected.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
})();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, From our backend");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
