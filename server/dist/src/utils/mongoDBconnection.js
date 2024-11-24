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
exports.DatabaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conifg_1 = require("./conifg");
class DatabaseConnection {
    constructor() {
        this.dbUri = conifg_1.DB_URIMONGODB || "";
        if (!this.dbUri) {
            console.error("Database URI not found in environment variables");
            process.exit(1);
        }
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield mongoose_1.default.connect(this.dbUri);
                console.log(`Database Connected: ${conn.connection.host}`);
            }
            catch (err) {
                console.error(`Database Error: ${err.message}`);
                process.exit(1);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                console.log(`Database disconnect`);
            }
            catch (err) {
                console.error(`Database Error: ${err.message}`);
                process.exit(1);
            }
        });
    }
}
exports.DatabaseConnection = DatabaseConnection;
exports.default = DatabaseConnection;
//# sourceMappingURL=mongoDBconnection.js.map