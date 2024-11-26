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
const UserController_1 = require("../controller/UserController");
const authenticateTokenAndCheckRole_1 = require("../middlewares/authenticateTokenAndCheckRole");
const router = (0, express_1.Router)();
const userLoginController = new UserController_1.UserLoginController();
const userRegisterController = new UserController_1.UserRegisterController();
const auth = new authenticateTokenAndCheckRole_1.AuthentivateToken();
router.route("/singin").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userLoginController.login(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.route("/singup").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        yield userRegisterController.signUp(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router
    .route("/getUserData")
    .get(auth.authenticateToken.bind(auth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userLoginController.getUserData(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.route("/resetPassword").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userLoginController.resetPassword(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.route("/changePassword").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userLoginController.changePassword(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.route("/VerifyEmail").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userLoginController.VerifyEmail(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
module.exports = router;
//# sourceMappingURL=UserRouter.js.map