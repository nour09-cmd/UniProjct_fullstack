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
exports.UserProfileModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoDBconnection_1 = __importDefault(require("../utils/mongoDBconnection"));
const AppointmentSchema = new mongoose_1.Schema({
    barber_email: { type: String, required: true },
    apoLadenId: { type: String, required: true },
    date: { type: Date, required: true },
});
const UserProfileSchema = new mongoose_1.Schema({
    user_email: { type: String, required: true },
    Appointments: { type: [AppointmentSchema], required: true },
});
class UserProfileModel {
    constructor() {
        this.conn = new mongoDBconnection_1.default();
        this.model = mongoose_1.default.model("UserProfile", UserProfileSchema);
    }
    createUserProfile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const newProfile = new this.model(data);
            const datas = yield newProfile.save();
            yield this.conn.disconnect();
            return datas;
        });
    }
    findProfileByEmail(user_email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const profile = yield this.model
                .findOne({ user_email: user_email })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return profile;
        });
    }
    deleteProfileByEmail(user_email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const deletedCount = yield this.model.deleteOne({ user_email }).exec();
            yield this.conn.disconnect();
            return deletedCount;
        });
    }
    createUserAppointment(user_email, appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const profile = yield this.model
                .findOneAndUpdate({ user_email }, { $push: { Appointments: appointment } }, { new: true })
                .lean()
                .exec();
            yield this.conn.disconnect();
            return profile;
        });
    }
    deleteUserAppointment(user_email, appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect();
            const profile = yield this.model
                .findOneAndUpdate({ user_email }, { $pull: { Appointments: { apoLadenId: appointmentId } } }, { new: true })
                .lean()
                .exec();
            return profile;
        });
    }
}
exports.UserProfileModel = UserProfileModel;
//# sourceMappingURL=UserAppointments.js.map