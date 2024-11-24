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
exports.PriceListeModel = exports.AppointmentsModel = exports.WeeksDaysModel = exports.CloseDaysModel = exports.LadenModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoDBconnection_1 = __importDefault(require("../utils/mongoDBconnection"));
const salesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    descriptions: { type: String },
    img: { type: String },
});
const priceListeSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    sales: { type: [salesSchema], required: true },
});
const reviewsSchema = new mongoose_1.Schema({
    user_email: { type: String, required: true },
    star: { type: Number, required: true },
});
const appointmentSchema = new mongoose_1.Schema({
    user_email: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: Boolean, required: true },
});
const closeDaysSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
});
const ladenAddressSchema = new mongoose_1.Schema({
    strasse: { type: String, required: true },
    plz: { type: String, required: true },
    ort: { type: String, required: true },
});
const weekdaysSchema = new mongoose_1.Schema({
    day: { type: String, required: true },
    status: { type: String, required: true },
    available_time_from: { type: String, required: true },
    available_time_to: { type: String, required: true },
    appointment_duration: { type: Number, required: true },
});
const ladenSchema = new mongoose_1.Schema({
    barber_email: { type: String, required: true },
    Laden_name: { type: String, required: true },
    Laden_description: { type: String, required: true },
    Laden_IMG: { type: [String], required: true },
    reviews: { type: [reviewsSchema], required: true },
    start_Abo_Date: { type: String, required: true },
    end_Abo_Date: { type: String, required: true },
    Laden_adress: { type: ladenAddressSchema, required: true },
    week_days: { type: [weekdaysSchema], required: true },
    reserved_appointments: { type: [appointmentSchema] },
    close_days: { type: [closeDaysSchema] },
    priceListe: { type: [priceListeSchema] },
});
class LadenModel {
    constructor() {
        this.conn = new mongoDBconnection_1.default();
        this.model = mongoose_1.default.model("LadensProfile", ladenSchema);
    }
    createLaden(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const newLaden = new this.model(data);
            const datas = yield newLaden.save();
            yield this.conn.disconnect();
            return datas;
        });
    }
    findByBarberes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model.find().lean().exec();
            yield this.conn.disconnect();
            return data;
        });
    }
    findByBarberEmail(barber_email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOne({ barber_email: barber_email })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
    deleteByBarberEmail(barber_email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model.deleteOne({ barber_email: barber_email });
            yield this.conn.disconnect();
            return data;
        });
    }
    updateBarberProfileByEmail(barber_email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const updatedLaden = yield this.model
                .findOneAndUpdate({ barber_email: barber_email }, data)
                .lean()
                .exec();
            return updatedLaden;
        });
    }
}
exports.LadenModel = LadenModel;
class CloseDaysModel {
    constructor() {
        this.conn = new mongoDBconnection_1.default();
        this.model = mongoose_1.default.model("LadensProfile", ladenSchema);
    }
    addCloseDayBarberProfileByEmail(barber_email, closeDay) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOneAndUpdate({ barber_email: barber_email }, { $push: { close_days: closeDay } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
    deleteCloseDayBarberProfileByEmail(barber_email, closeDayId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOneAndUpdate({ barber_email }, { $pull: { close_days: { _id: closeDayId } } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
}
exports.CloseDaysModel = CloseDaysModel;
class WeeksDaysModel {
    constructor() {
        this.conn = new mongoDBconnection_1.default();
        this.model = mongoose_1.default.model("LadensProfile", ladenSchema);
    }
    updateWeekdaysTimeBarberProfileByEmail(barber_email, weekDayData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOneAndUpdate({ barber_email }, { $set: { week_days: weekDayData } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
}
exports.WeeksDaysModel = WeeksDaysModel;
class AppointmentsModel {
    constructor() {
        this.conn = new mongoDBconnection_1.default();
        this.model = mongoose_1.default.model("LadensProfile", ladenSchema);
    }
    addAppointmentBarberProfileByEmail(barber_email, appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            console.log(barber_email);
            const data = yield this.model
                .findOneAndUpdate({ barber_email: barber_email }, { $push: { reserved_appointments: appointment } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
    getAppointmentBarberProfileByEmail(barber_email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const laden = yield this.model
                .findOne({ barber_email: barber_email }, { reserved_appointments: 1 })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return laden ? laden.reserved_appointments : [];
        });
    }
    deleteAppointmentBarberProfileByEmail(barber_email, appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOneAndUpdate({ barber_email: barber_email }, { $pull: { reserved_appointments: { _id: appointmentId } } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
}
exports.AppointmentsModel = AppointmentsModel;
class PriceListeModel {
    constructor() {
        this.conn = new mongoDBconnection_1.default();
        this.model = mongoose_1.default.model("LadensProfile", ladenSchema);
    }
    addPriceListeBarberProfileByEmail(barber_email, PriceListe) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOneAndUpdate({ barber_email: barber_email }, { $push: { priceListe: PriceListe } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
    updatePriceListeBarberProfileByEmail(barber_email, PriceListe) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOneAndUpdate({ barber_email, "priceListe._id": PriceListe._id }, { $set: { "priceListe.$": PriceListe } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
    deletePriceListeBarberProfileByEmail(barber_email, priceListe) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const data = yield this.model
                .findOneAndUpdate({ barber_email }, { $pull: { priceListe: { _id: priceListe } } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return data;
        });
    }
}
exports.PriceListeModel = PriceListeModel;
//# sourceMappingURL=Laden.js.map