import { Request, Response, Router } from "express";
import { WeekDaysController } from "../controller/WeekDaysController";
import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { sendResponse } from "../utils/conifg";
const router = Router();
const weekDaysController = new WeekDaysController();
const auth = new AuthentivateToken();

router
  .route("/weekdays")
  .post(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await weekDaysController.getWeeksDays(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  )
  .put(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await weekDaysController.updateWeeksDays(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );

module.exports = router;
