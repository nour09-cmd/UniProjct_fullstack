import { Request, Response, Router } from "express";
import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { UserLoginController } from "../controller/UserLoginController";
import { UserRegisterController } from "../controller/UserRegisterController";
import { sendResponse } from "../utils/conifg";

const router = Router();

const userLoginController = new UserLoginController();
const userRegisterController = new UserRegisterController();
const auth = new AuthentivateToken();

router
  .route("/rollerChecker")
  .get(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await userLoginController.checkRoller(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router.route("/singin").post(async (req: Request, res: Response) => {
  try {
    await userLoginController.login(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.route("/singup").post(async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    await userRegisterController.signUp(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router
  .route("/getUserData")
  .get(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await userLoginController.getUserData(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router.route("/resetPassword").post(async (req: Request, res: Response) => {
  try {
    await userLoginController.resetPassword(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.route("/changePassword").post(async (req: Request, res: Response) => {
  try {
    await userLoginController.changePassword(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.route("/VerifyEmail").get(async (req: Request, res: Response) => {
  try {
    await userLoginController.VerifyEmail(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
