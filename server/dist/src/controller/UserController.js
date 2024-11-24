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
exports.UserLoginController = exports.UserRegisterController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const Rolle_1 = require("../models/Rolle");
const conifg_1 = require("../utils/conifg");
const data_source_1 = require("../utils/data-source");
const User_1 = require("../models/User");
const Adresse_1 = require("../models/Adresse");
const class_transformer_1 = require("class-transformer");
const RegisterDTO_1 = require("../DTOs/RegisterDTO");
const class_validator_1 = require("class-validator");
const ValidierungsClasse_1 = require("../utils/ValidierungsClasse");
const LoginDTO_1 = require("../DTOs/LoginDTO");
const UserAppointments_1 = require("../models/UserAppointments");
const EmailControler_1 = require("../utils/EmailControler");
const UploadImages_1 = require("../utils/UploadImages");
class UserLoginController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.emailS = new EmailControler_1.EmailService();
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email } });
        });
    }
    getUserWithToken(verifyToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { verifyToken } });
        });
    }
    getUserWithPasswordToken(resetpasswordtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { resetpasswordtoken } });
        });
    }
    getUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const emails = req["user"]["email"];
            const user = yield this.getUser(emails);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const { vorname, nachname, email, handynummer, image } = user;
            return res
                .status(200)
                .json({ vorname, nachname, email, handynummer, image });
        });
    }
    createToken(email, name) {
        const token = jsonwebtoken_1.default.sign({ name, email }, conifg_1.SECRET_KEY, {
            expiresIn: "5h",
        });
        return token;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDTO = (0, class_transformer_1.plainToClass)(LoginDTO_1.UserLoginDTO, req.body);
                const errors = yield (0, class_validator_1.validate)(userDTO);
                if (errors.length > 0) {
                    return res.status(400).json({ message: "Validation failed", errors });
                }
                const { email, password } = userDTO;
                const validierungesData = new ValidierungsClasse_1.Validierunges([email, password]);
                const arrData = yield validierungesData.filterHtmlScrpitsSQL();
                const [emails, passwords] = arrData;
                const user = yield this.getUser(emails);
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(passwords, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ error: "Invalid possword" });
                }
                const name = `${user.vorname} ${user.nachname}`;
                const token = this.createToken(emails, name);
                return res.status(200).json({ token });
            }
            catch (err) {
                console.error("Error during login:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    VerifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = req.query.token;
                const email = ((_a = req["user"]) === null || _a === void 0 ? void 0 : _a["email"]) || "";
                if (!token) {
                    return res.status(400).json({ message: "Token not found" });
                }
                const userData = yield this.getUserWithToken(token);
                if (!userData) {
                    return res.status(400).json({ message: "Invalid token" });
                }
                userData.verifyToken = "";
                userData.verifyStatus = true;
                yield this.userRepository.save(userData);
                this.emailS.AcceptedUserEmail(userData.email, userData, {
                    subject: "Email verified successfully",
                });
                return res.status(200).json({ message: "Email verified successfully" });
            }
            catch (error) {
                console.error("Error during email verification:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDTO = (0, class_transformer_1.plainToClass)(LoginDTO_1.ResetPasswordDTO, req.body);
                const errors = yield (0, class_validator_1.validate)(userDTO);
                if (errors.length > 0) {
                    return res.status(400).json({ message: "Validation failed", errors });
                }
                const userData = yield this.getUser(userDTO.email);
                if (!userData) {
                    return res.status(400).json({ message: "Invalid email" });
                }
                const passwordToken = crypto_1.default.randomBytes(64).toString("hex");
                userData.password = yield bcryptjs_1.default.hash("changePassword000000", 10);
                userData.resetpasswordtoken = passwordToken;
                userData.resetPasswordStatus = true;
                yield this.userRepository.save(userData);
                this.emailS.ResetPasswordEmail(userData.email, userData, {
                    subject: "Passwort zurücksetzen für Ihr Barber-Finder-Konto",
                    link: `http://localhost:4545/api/users/changePassword?token=${passwordToken}`,
                });
                return res.status(200).json({ message: "Email verified successfully" });
            }
            catch (error) {
                console.error("Error during email verification:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.query.token;
                const { password } = req.body;
                if (!password || !token) {
                    return res
                        .status(400)
                        .json({ message: "Invalid no password or token" });
                }
                const userData = yield this.getUserWithPasswordToken(token);
                if (!(userData === null || userData === void 0 ? void 0 : userData.email)) {
                    return res.status(400).json({ message: "Invalid token" });
                }
                if (!(userData === null || userData === void 0 ? void 0 : userData.resetpasswordtoken)) {
                    return res.status(400).json({
                        message: "Your password action is not started pls click on restePassword first",
                    });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                userData.password = hashedPassword;
                userData.resetpasswordtoken = "";
                userData.resetPasswordStatus = false;
                yield this.userRepository.save(userData);
                this.emailS.passwordChangedEmail(userData.email, userData, {
                    subject: "Passwortänderung erfolgreich für Ihr Barber-Finder-Konto",
                });
                return res.status(200).json({ message: "Email verified successfully" });
            }
            catch (error) {
                console.error("Error during email verification:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.UserLoginController = UserLoginController;
class UserRegisterController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.adresseRepository = data_source_1.AppDataSource.getRepository(Adresse_1.Adresse);
        this.rolle = Rolle_1.Rolle.BARBER;
        this.modelAppointmentUser = new UserAppointments_1.UserProfileModel();
        this.emailS = new EmailControler_1.EmailService();
        this.imageUpload = new UploadImages_1.ImageUploads();
    }
    createToken(email, name) {
        const token = jsonwebtoken_1.default.sign({ name, email }, conifg_1.SECRET_KEY, {
            expiresIn: "5h",
        });
        return token;
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email } });
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDTO = (0, class_transformer_1.plainToClass)(RegisterDTO_1.UserRegisterDTO, req.body);
                const errors = yield (0, class_validator_1.validate)(userDTO);
                if (errors.length > 0) {
                    return res.status(400).json({ message: "Validation failed", errors });
                }
                const { email, password, vorname, nachname, handynummer, geburtsdatum, address, } = userDTO;
                const { strasse, ort, plz } = address || {};
                const validierungesData = new ValidierungsClasse_1.Validierunges([
                    email,
                    password,
                    vorname,
                    nachname,
                    handynummer,
                    geburtsdatum,
                    strasse,
                    ort,
                    plz,
                ]);
                const arrData = yield validierungesData.filterHtmlScrpitsSQL();
                const [emails, passwords, vornames, nachnames, handynummers, geburtsdatums, strasses, orts, plzs,] = arrData;
                const existingUser = yield this.getUser(emails);
                if (existingUser) {
                    return res.status(409).json({ error: "User already exists" });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(passwords, 10);
                const newAddress = this.adresseRepository.create({
                    strasse: strasses,
                    ort: orts,
                    plz: plzs,
                });
                const savedAddressId = yield this.adresseRepository.save(newAddress);
                const emailToken = crypto_1.default.randomBytes(64).toString("hex");
                const newUser = this.userRepository.create({
                    image: req.body.image || "",
                    email: emails,
                    password: hashedPassword,
                    vorname: vornames,
                    nachname: nachnames,
                    rolle: this.rolle,
                    adresse: savedAddressId,
                    handynummer: handynummers,
                    geburtsdatum: geburtsdatums,
                    verifyToken: emailToken,
                    verifyStatus: false,
                    resetpasswordtoken: "null",
                    resetPasswordStatus: false,
                });
                yield this.userRepository.save(newUser);
                const name = `${vornames} ${nachnames}`;
                const token = this.createToken(emails, name);
                const data = {
                    user_email: emails,
                    Appointments: [],
                };
                const createProfileUser = this.modelAppointmentUser.createUserProfile(data);
                const sendMail = this.emailS.firstRegisterEmail(emails, {
                    email: emails,
                    name: vornames + " " + nachnames,
                    rolle: this.rolle,
                    adresse: savedAddressId,
                    handynummer: handynummers,
                    geburtsdatum: geburtsdatums,
                }, {
                    subject: "Bitte bestätigen Sie Ihre E-Mail-Adresse",
                    link: `http://localhost:4545/api/users/VerifyEmail?token=${emailToken}`,
                });
                return res.status(201).json({
                    message: "User registered successfully",
                    token,
                    createProfileUser,
                    sendMail,
                });
            }
            catch (error) {
                console.error("Error during registration:", error);
                return res.status(500).json({
                    error: "Internal server error",
                    message: error.message,
                });
            }
        });
    }
}
exports.UserRegisterController = UserRegisterController;
//# sourceMappingURL=UserController.js.map