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
exports.PriceListController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Laden_1 = require("../models/Laden");
const AppointmentDTO_1 = require("../DTOs/AppointmentDTO");
const PriceListeDTO_1 = require("../DTOs/PriceListeDTO");
class PriceListController {
    constructor() {
        this.modelLaden = new Laden_1.LadenModel();
        this.modelPriceList = new Laden_1.PriceListeModel();
    }
    getPriceList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const PriceListDTO = (0, class_transformer_1.plainToClass)(AppointmentDTO_1.GetLadenDTO, {
                email: req.body.email,
            });
            const errors = yield (0, class_validator_1.validate)(PriceListDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const laden = yield this.modelLaden.findByBarberEmail(PriceListDTO.email);
            if (!laden) {
                return res.status(400).json({ message: "Laden Not Found" });
            }
            return res.status(200).json({ priceListe: laden.priceListe });
        });
    }
    createPriceList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createLadenDTO = (0, class_transformer_1.plainToClass)(PriceListeDTO_1.CreatePriceListDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(createLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const email = req["user"]["email"];
            const laden = yield this.modelLaden.findByBarberEmail(email);
            if (!laden) {
                return res.status(400).json({ message: "Laden Not Found" });
            }
            const list = {
                category: createLadenDTO.category,
                sales: createLadenDTO.sales,
            };
            const createList = this.modelPriceList.addPriceListeBarberProfileByEmail(email, list);
            return res
                .status(200)
                .json({ message: "PriceList is created", createList });
        });
    }
    updatePriceList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateLadenDTO = (0, class_transformer_1.plainToClass)(PriceListeDTO_1.CreatePriceListDTO, req.body);
            const errors = yield (0, class_validator_1.validate)(updateLadenDTO);
            if (errors.length > 0) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            const email = req["user"]["email"];
            const list = {
                _id: req.body.listId,
                category: updateLadenDTO.category,
                sales: updateLadenDTO.sales,
            };
            const updateList = this.modelPriceList.updatePriceListeBarberProfileByEmail(email, list);
            return res
                .status(200)
                .json({ message: "PriceList is updated", updateList });
        });
    }
    deletePriceList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req["user"]["email"];
            const deleteList = yield this.modelPriceList.deletePriceListeBarberProfileByEmail(email, req.body.listId);
            return res
                .status(200)
                .json({ message: "Close Day Date is deleted", deleteList });
        });
    }
}
exports.PriceListController = PriceListController;
//# sourceMappingURL=PriceListeController.js.map