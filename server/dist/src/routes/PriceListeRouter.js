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
const express_1 = require("express");
const authenticateTokenAndCheckRole_1 = require("../middlewares/authenticateTokenAndCheckRole");
const PriceListeController_1 = require("../controller/PriceListeController");
const router = (0, express_1.Router)();
const priceListController = new PriceListeController_1.PriceListController();
const auth = new authenticateTokenAndCheckRole_1.AuthentivateToken();
router
    .route("/PriceList")
    .get(auth.authenticateToken.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield priceListController.getPriceList(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}))
    .post(auth.authenticateTokenBarber.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield priceListController.createPriceList(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}))
    .delete(auth.authenticateTokenBarber.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield priceListController.deletePriceList(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}))
    .put(auth.authenticateTokenBarber.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield priceListController.updatePriceList(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
//# sourceMappingURL=PriceListeRouter.js.map