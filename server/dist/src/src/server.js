"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const conifg_1 = require("../utils/conifg");
const data_source_1 = require("../utils/data-source");
const bodyParser = __importStar(require("body-parser"));
const cors = require("cors");
const userRoute = require("../routes/UserRouter");
const LadensRoute = require("../routes/LadenRoute");
const LadensCloseDaysRoute = require("../routes/ClosedaysRouter");
const LadensWeeksDaysRoute = require("../routes/WeeksDaysRouter");
const AppointmentsRoute = require("../routes/AppointmentRouter");
const PriceListRoute = require("../routes/PriceListeRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = conifg_1.PORT || 4545;
data_source_1.AppDataSource.initialize();
app.use(express_1.default.json());
app.use("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.use("/api/users", userRoute);
app.use("/api/ladens", LadensRoute);
app.use("/api/ladens", LadensCloseDaysRoute);
app.use("/api/ladens", LadensWeeksDaysRoute);
app.use("/api/ladens", AppointmentsRoute);
app.use("/api/ladens", PriceListRoute);
app.get("/", (req, res) => {
    res.send("Hello, From our backend");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map