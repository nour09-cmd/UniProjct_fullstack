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
const WeekDaysController_1 = require("../controller/WeekDaysController");
const authenticateTokenAndCheckRole_1 = require("../middlewares/authenticateTokenAndCheckRole");
const router = (0, express_1.Router)();
const weekDaysController = new WeekDaysController_1.WeekDaysController();
const auth = new authenticateTokenAndCheckRole_1.AuthentivateToken();
router
    .route("/weekdays")
    .post(auth.authenticateToken.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield weekDaysController.getWeeksDays(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}))
    .put(auth.authenticateTokenBarber.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield weekDaysController.updateWeeksDays(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
//# sourceMappingURL=WeeksDaysRouter.js.map