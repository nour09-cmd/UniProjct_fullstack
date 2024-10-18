"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_Postgres_1 = __importDefault(require("../utils/dbConnect_Postgres"));
const mongoDBconnection_1 = __importDefault(require("../utils/mongoDBconnection"));
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4545;
const dbPostgresSql = new dbConnect_Postgres_1.default();
const mongoDbCon = new mongoDBconnection_1.default();
app.use("*", cors());
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoDbCon.connect();
        yield dbPostgresSql.connect();
        yield dbPostgresSql.initialize();
        console.log("database is Connected.");
    }
    catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}))();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, From our backend");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map