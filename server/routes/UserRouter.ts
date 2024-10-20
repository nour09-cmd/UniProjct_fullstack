import { Request, Response, Router } from "express";
import {
  UserLoginController,
  UserRegisterController,
} from "../controller/UserController";

const router = Router();

const userLoginController = new UserLoginController();
const userRegisterController = new UserRegisterController();

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

module.exports = router;
