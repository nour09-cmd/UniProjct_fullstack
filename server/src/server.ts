import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PORT } from "../utils/conifg";
import { AppDataSource } from "../utils/data-source";
const cors = require("cors");
const userRoute = require("../routes/UserRouter");
const LadensRoute = require("../routes/LadenRoute");
const LadensCloseDaysRoute = require("../routes/ClosedaysRouter");
const LadensWeeksDaysRoute = require("../routes/WeeksDaysRouter");
const AppointmentsRoute = require("../routes/AppointmentRouter");
const PriceListRoute = require("../routes/PriceListeRouter");

dotenv.config();
const app = express();
const LIMIT = "50mb";
app.use(express.json({ limit: LIMIT }));
app.use(express.urlencoded({ limit: LIMIT, extended: true }));
const port = PORT || 4545;
AppDataSource.initialize();
app.use(express.json());
app.use("*", cors());

app.use("/api/users", userRoute);
app.use("/api/ladens", LadensRoute);
app.use("/api/ladens", LadensCloseDaysRoute);
app.use("/api/ladens", LadensWeeksDaysRoute);
app.use("/api/ladens", AppointmentsRoute);
app.use("/api/ladens", PriceListRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, From our backend");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
