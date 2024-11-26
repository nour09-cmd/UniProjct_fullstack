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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseDaysController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Laden_1 = require("../models/Laden");
const CloseDaysDTO_1 = require("../DTOs/CloseDaysDTO");
const AppointmentDTO_1 = require("../DTOs/AppointmentDTO");
class CloseDaysController {
    constructor() {
        this.modelLaden = new Laden_1.LadenModel();
        this.modelCloseDays = new Laden_1.CloseDaysModel();
    }
    createCloseDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createLadenDTO = (0, class_transformer_1.plainToClass)(CloseDaysDTO_1.CloseDaysDTO, {
                date: req.body.date,
                barberEmail: req["user"]["email"],
            });
            const errors = yield (0, class_validator_1.validate)(createLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const laden = yield this.modelLaden.findByBarberEmail(createLadenDTO.barberEmail);
            if (!laden) {
                return res.status(400).json({ message: "Laden Not Found" });
            }
            const createdDay = yield this.modelCloseDays.addCloseDayBarberProfileByEmail(createLadenDTO.barberEmail, { date: new Date(createLadenDTO.date) });
            return res
                .status(200)
                .json({ message: "Colse Day Date is created", createdDay });
        });
    }
    getCloseDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getLadenDTO = (0, class_transformer_1.plainToClass)(AppointmentDTO_1.GetLadenDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(getLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const laden = yield this.modelLaden.findByBarberEmail(getLadenDTO.email);
            if (!laden) {
                return res.status(400).json({ message: "Laden Not Found" });
            }
            return res.status(200).json(Object.assign({}, laden.close_days));
        });
    }
    deleteCloseDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const closeDayId = req.body.closeDayId;
            const barberEmail = req["user"]["email"];
            const deleteDay = yield this.modelCloseDays.deleteCloseDayBarberProfileByEmail(barberEmail, closeDayId);
            return res
                .status(200)
                .json({ message: "Close Day Date is deleted", deleteDay });
        });
    }
}
exports.CloseDaysController = CloseDaysController;
//# sourceMappingURL=CloseDaysController.js.map