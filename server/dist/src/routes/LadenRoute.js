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
const authenticateTokenAndCheckRole_1 = require("../middlewares/authenticateTokenAndCheckRole");
const LadenController_1 = require("../controller/LadenController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const ladenController = new LadenController_1.LadenController();
const auth = new authenticateTokenAndCheckRole_1.AuthentivateToken();
router.route("/getOneladens").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ladenController.getLadenByEmail(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router
    .route("/getladens")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ladenController.getLadens(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}))
    .post(auth.authenticateTokenBarber.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ladenController.createLaden(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}))
    .delete(auth.authenticateTokenBarber.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ladenController.deleteLadenByEmail(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}))
    .put(auth.authenticateTokenBarber.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ladenController.updateLaden(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
//# sourceMappingURL=LadenRoute.js.map