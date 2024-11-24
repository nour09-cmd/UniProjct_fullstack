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
exports.AuthentivateToken = void 0;
const conifg_1 = require("../utils/conifg");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const data_source_1 = require("../utils/data-source");
class AuthentivateToken {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email } });
        });
    }
    authenticateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.header("Authorization");
            const token = authHeader;
            if (!token)
                return res
                    .status(401)
                    .send({ message: "Access denied. No token provided." });
            try {
                const decoded = jsonwebtoken_1.default.verify(token, conifg_1.SECRET_KEY);
                const { name, email } = decoded;
                const user = yield this.getUser(email);
                if (!user)
                    return res
                        .status(401)
                        .send({ message: "Access denied. Invalid token." });
                req["user"] = { name, email };
                next();
            }
            catch (error) {
                return res.status(400).send({ message: "Invalid token" });
            }
        });
    }
    authenticateTokenBarber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.header("Authorization");
            const token = authHeader;
            if (!token)
                return res
                    .status(401)
                    .send({ message: "Access denied. No token provided." });
            try {
                const decoded = jsonwebtoken_1.default.verify(token, conifg_1.SECRET_KEY);
                const { name, email } = decoded;
                const user = yield this.getUser(email);
                if (!user)
                    return res
                        .status(401)
                        .send({ message: "Access denied. Invalid token." });
                req["user"] = { name, email };
                if (user["rolle"] != "BARBER")
                    return res
                        .status(401)
                        .send({ message: "Access denied. you must by barber" });
                next();
            }
            catch (error) {
                return res.status(400).send({ message: "Invalid token" });
            }
        });
    }
    authenticateTokenAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.header("Authorization");
            const token = authHeader;
            if (!token)
                return res
                    .status(401)
                    .send({ message: "Access denied. No token provided." });
            try {
                const decoded = jsonwebtoken_1.default.verify(token, conifg_1.SECRET_KEY);
                const { name, email } = decoded;
                const user = yield this.getUser(email);
                if (!user)
                    return res
                        .status(401)
                        .send({ message: "Access denied. Invalid token." });
                req["user"] = { name, email };
                if (user["rolle"] != "ADMIN")
                    return res
                        .status(401)
                        .send({ message: "Access denied. you must by barber" });
                next();
            }
            catch (error) {
                return res.status(400).send({ message: "Invalid token" });
            }
        });
    }
}
exports.AuthentivateToken = AuthentivateToken;
//# sourceMappingURL=authenticateTokenAndCheckRole.js.map