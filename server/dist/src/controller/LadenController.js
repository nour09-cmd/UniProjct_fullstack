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
exports.LadenController = void 0;
const Laden_1 = require("../models/Laden");
const LadenDTO_1 = require("../DTOs/LadenDTO");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const defultWeekDays_1 = __importDefault(require("../utils/defultWeekDays"));
const date_fns_1 = require("date-fns");
const ValidierungsClasse_1 = require("../utils/ValidierungsClasse");
class LadenController {
    constructor() {
        this.modelMonogo = new Laden_1.LadenModel();
    }
    getLadens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ladens = yield this.modelMonogo.findByBarberes();
            return res.status(200).json(Object.assign({}, ladens));
        });
    }
    getLadenByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getLadenDTO = (0, class_transformer_1.plainToClass)(LadenDTO_1.GetLadenDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(getLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const { email } = getLadenDTO;
            const ladenData = yield this.modelMonogo.findByBarberEmail(email);
            if (!ladenData) {
                return res.status(400).json({ message: "ladenData not Fund" });
            }
            ladenData.start_Abo_Date = "";
            ladenData.end_Abo_Date = "";
            return res.status(200).json(Object.assign({}, ladenData));
        });
    }
    createLaden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const barber_email = req["user"]["email"];
            const createLadenDTO = (0, class_transformer_1.plainToClass)(LadenDTO_1.CreateLadenDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(createLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const { Laden_name, Laden_description, Laden_IMG, Laden_adress } = createLadenDTO;
            const { strasse, ort, plz } = Laden_adress || {};
            const validierungesData = new ValidierungsClasse_1.Validierunges([
                Laden_name,
                Laden_description,
                strasse,
                ort,
                plz,
            ]);
            const arrData = yield validierungesData.filterHtmlScrpitsSQL();
            const [Laden_names, Laden_descriptions, strasses, orts, plzs] = arrData;
            const findLaden = yield this.modelMonogo.findByBarberEmail(barber_email);
            if (findLaden) {
                return res
                    .status(400)
                    .json({ message: "this email have olready on Laden" });
            }
            const reserved_appointments = [];
            const close_days = [];
            const reviews = [];
            const date = (0, date_fns_1.format)(new Date(), "yyyy-MM-dd");
            const start_Abo_Date = date;
            const end_Abo_Date = date;
            const newLaden = {
                barber_email: barber_email,
                Laden_name: Laden_names,
                Laden_description: Laden_descriptions,
                Laden_IMG: Laden_IMG,
                reviews: reviews,
                start_Abo_Date: start_Abo_Date,
                end_Abo_Date: end_Abo_Date,
                Laden_adress: { strasse: strasses, plz: plzs, ort: orts },
                week_days: defultWeekDays_1.default,
                reserved_appointments: reserved_appointments,
                close_days: close_days,
                priceListe: [],
            };
            const createLaden = yield this.modelMonogo.createLaden(newLaden);
            if (createLaden) {
                return res.status(200).json({ createLaden: true });
            }
        });
    }
    updateLaden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const barber_email = req["user"]["email"];
            const { data } = req.body;
            const findLaden = yield this.modelMonogo.findByBarberEmail(barber_email);
            if (!findLaden) {
                return res.status(400).json({ message: "Laden not exsist " });
            }
            const { strasse, ort, plz } = data.Laden_adress || (findLaden === null || findLaden === void 0 ? void 0 : findLaden.Laden_adress);
            let Laden_IMG = findLaden.Laden_IMG;
            let Laden_adress = { strasse, ort, plz };
            if (data.Laden_IMG.length > 0) {
                Laden_IMG = data.Laden_IMG;
            }
            if (data.Laden_adress) {
                Laden_adress = data.Laden_adress;
            }
            const newLaden = {
                Laden_name: data.Laden_name || findLaden.Laden_name,
                Laden_description: data.Laden_description || findLaden.Laden_description,
                Laden_IMG: Laden_IMG,
                Laden_adress: Laden_adress,
            };
            const validierungesData = new ValidierungsClasse_1.Validierunges([
                newLaden.Laden_name,
                newLaden.Laden_description,
                Laden_adress.strasse,
                Laden_adress.plz,
                Laden_adress.ort,
            ]);
            const arrData = yield validierungesData.filterHtmlScrpits();
            const [Laden_names, Laden_descriptions, strasses, plzs, orts] = arrData;
            const clearDataLaden = {
                Laden_name: Laden_names,
                Laden_description: Laden_descriptions,
                Laden_IMG: Laden_IMG,
                Laden_adress: { strasse: strasses, plz: plzs, ort: orts },
            };
            const updateLaden = yield this.modelMonogo.updateBarberProfileByEmail(barber_email, clearDataLaden);
            return res.status(200).json({ messager: true, data: clearDataLaden });
        });
    }
    deleteLadenByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req["user"]["email"];
            const getLaden = yield this.modelMonogo.findByBarberEmail(email);
            if (!getLaden) {
                return res.status(400).json({ message: "Laden not exsist " });
            }
            const ladenData = yield this.modelMonogo.deleteByBarberEmail(email);
            return res.status(200).json({ message: "Laden is deleted", ladenData });
        });
    }
}
exports.LadenController = LadenController;
//# sourceMappingURL=LadenController.js.map