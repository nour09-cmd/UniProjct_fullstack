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
exports.WeekDaysController = void 0;
const Laden_1 = require("../models/Laden");
const AppointmentDTO_1 = require("../DTOs/AppointmentDTO");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const WeeksdaysDTO_1 = require("../DTOs/WeeksdaysDTO");
class WeekDaysController {
    constructor() {
        this.modelWeeksDays = new Laden_1.WeeksDaysModel();
        this.modelLaden = new Laden_1.LadenModel();
    }
    getWeeksDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getLadenDTO = (0, class_transformer_1.plainToClass)(AppointmentDTO_1.GetLadenDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(getLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const weekDays = yield this.modelLaden.findByBarberEmail(getLadenDTO.email);
            if (!weekDays)
                return res.status(400).json({ message: "Laden Not Found" });
            return res.status(200).json(Object.assign({}, weekDays.week_days));
        });
    }
    updateWeeksDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const weekDaysDTO = (0, class_transformer_1.plainToClass)(WeeksdaysDTO_1.WeekDaysDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(weekDaysDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const barber_email = req["user"]["email"];
            const { weekDays } = weekDaysDTO;
            const weekDayss = yield this.modelLaden.findByBarberEmail(barber_email);
            if (!weekDayss)
                return res.status(400).json({ message: "Laden Not Found" });
            const weekDaysdb = yield this.modelWeeksDays.updateWeekdaysTimeBarberProfileByEmail(barber_email, weekDays);
            if (!weekDaysdb)
                return res.status(400).json({ message: "Laden Not Found" });
            return res.status(200).json({ message: "data is ollready update" });
        });
    }
}
exports.WeekDaysController = WeekDaysController;
//# sourceMappingURL=WeekDaysController.js.map