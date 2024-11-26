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
exports.AppointmentController = void 0;
const Laden_1 = require("../models/Laden");
const UserAppointments_1 = require("../models/UserAppointments");
const AppointmentDTO_1 = require("../DTOs/AppointmentDTO");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const LadenDTO_1 = require("../DTOs/LadenDTO");
const EmailControler_1 = require("../utils/EmailControler");
const data_source_1 = require("../utils/data-source");
const User_1 = require("../models/User");
const date_fns_1 = require("date-fns");
class AppointmentController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.modelAppointmentLaden = new Laden_1.AppointmentsModel();
        this.modelAppointmentUser = new UserAppointments_1.UserProfileModel();
        this.modelMonogo = new Laden_1.LadenModel();
        this.emailS = new EmailControler_1.EmailService();
    }
    getAppointmentLaden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getLadenDTO = (0, class_transformer_1.plainToClass)(LadenDTO_1.GetLadenDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(getLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const Laden_email = req.body.email;
            const appointments = yield this.modelAppointmentLaden.getAppointmentBarberProfileByEmail(Laden_email);
            if (!appointments)
                return res.status(400).json({ status: false, message: "User Not Found" });
            return res.status(200).json({ status: true, appointments });
        });
    }
    getAppointmentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const User_email = req["user"]["email"];
            const appointments = yield this.modelAppointmentUser.findProfileByEmail(User_email);
            if (!appointments)
                return res.status(400).json({ status: false, message: "User Not Found" });
            return res.status(200).json({ status: true, appointments });
        });
    }
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createLadenDTO = (0, class_transformer_1.plainToClass)(AppointmentDTO_1.CreateAppointmentDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(createLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const { name, date, time, barber_email } = req.body;
            const user_email = req["user"]["email"];
            const appointment = yield this.modelAppointmentLaden.addAppointmentBarberProfileByEmail(barber_email, {
                user_email,
                name,
                date,
                time,
                status: true,
            });
            if (!appointment)
                return res
                    .status(400)
                    .json({ status: false, message: "Appointment Not Created" });
            const apoLadenId = appointment.reserved_appointments.slice(-1)[0];
            yield this.modelAppointmentUser.createUserAppointment(user_email, {
                barber_email,
                date,
                apoLadenId: apoLadenId._id,
            });
            const userData = yield this.userRepository.findOne({
                where: { email: user_email },
            });
            const ladenData = yield this.modelMonogo.findByBarberEmail(barber_email);
            const dt = date + "T" + time + ":00";
            const dates = (0, date_fns_1.format)(new Date(dt), "yyyyMMdd'T'HHmmss");
            console.log(dates);
            const googleKalnderLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${ladenData === null || ladenData === void 0 ? void 0 : ladenData.Laden_name}&dates=${dates}&details=${"Ihren Termin Bei " + (ladenData === null || ladenData === void 0 ? void 0 : ladenData.Laden_name)}&location=${ladenData === null || ladenData === void 0 ? void 0 : ladenData.Laden_adress.ort}
    `;
            this.emailS.UserAppointmentResEmailAnUser(user_email, ladenData, userData, {
                subject: "Termin wurde erfolgreich gebucht",
                apo: {
                    date,
                    time,
                },
                googleKalnderLink,
            });
            this.emailS.barberAppointmentResEmailAnBaber(barber_email, ladenData, userData, {
                subject: "Neuer Termin bei Ihnen gebucht",
                apo: {
                    date,
                    time,
                },
                googleKalnderLink,
            });
            return res.status(200).json(Object.assign({ status: true }, appointment));
        });
    }
    deleteAppointmentVonBarber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { barber_email, user_email, apoId, apoData } = req.body;
            const userData = yield this.userRepository.findOne({
                where: { email: user_email },
            });
            const ladenData = yield this.modelMonogo.findByBarberEmail(barber_email);
            const appointment = yield this.modelAppointmentLaden.deleteAppointmentBarberProfileByEmail(barber_email, apoId);
            if (!appointment)
                return res
                    .status(400)
                    .json({ status: false, message: "Appointment Not Found" });
            yield this.modelAppointmentUser.deleteUserAppointment(user_email, apoId);
            this.emailS.barberAppointmentDeletionEmailAnUser(user_email, ladenData, userData, {
                apoData,
                subject: "Ihr Termin wurde abgesagt",
            });
            this.emailS.barberAppointmentDeletionEmailAnBarber(barber_email, ladenData, userData, {
                apoData,
                subject: "Terminlöschung erfolgreich",
            });
            return res
                .status(200)
                .json({ status: true, message: "Appointment Deleted" });
        });
    }
    deleteAppointmentVonUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { barber_email, user_email, apoId, apoData } = req.body;
            const userData = yield this.userRepository.findOne({
                where: { email: user_email },
            });
            const ladenData = yield this.modelMonogo.findByBarberEmail(barber_email);
            const appointment = yield this.modelAppointmentLaden.deleteAppointmentBarberProfileByEmail(barber_email, apoId);
            if (!appointment)
                return res
                    .status(400)
                    .json({ status: false, message: "Appointment Not Found" });
            yield this.modelAppointmentUser.deleteUserAppointment(user_email, apoId);
            this.emailS.UserAppointmentDeletionEmailAnUser(user_email, ladenData, userData, {
                apoData,
                subject: "Ihre Terminabsage wurde bestätigt",
            });
            this.emailS.UserAppointmentDeletionEmailAnBarber(barber_email, ladenData, userData, {
                apoData,
                subject: "Ein Termin wurde vom Nutzer storniert",
            });
            return res
                .status(200)
                .json({ status: true, message: "Appointment Deleted" });
        });
    }
}
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=AppointmentController.js.map