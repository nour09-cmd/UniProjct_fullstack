import { Request, Response, Router } from "express";
import { WeekDaysController } from "../controller/WeekDaysController";
const router = Router();
const weekDaysController = new WeekDaysController();

router
  .route("/weekdays")
  .get(async (req: Request, res: Response) => {
    try {
      await weekDaysController.getWeeksDays(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      await weekDaysController.updateWeeksDays(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
