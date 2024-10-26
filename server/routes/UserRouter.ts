import { Request, Response, Router } from "express";
import {
  UserLoginController,
  UserRegisterController,
} from "../controller/UserController";
import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";

const router = Router();

const userLoginController = new UserLoginController();
const userRegisterController = new UserRegisterController();
const auth = new AuthentivateToken();

router.route("/singin").post(async (req: Request, res: Response) => {
  try {
    await userLoginController.login(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.route("/singup").post(async (req: Request, res: Response) => {
  try {
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
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
module.exports = router;
