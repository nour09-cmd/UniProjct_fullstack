import { Request, Response, Router } from "express";
import { CloseDaysController } from "../controller/CloseDaysController";
const router = Router();
const closeDaysController = new CloseDaysController();
router
  .route("/closedays")
  .get(async (req: Request, res: Response) => {
    try {
      await closeDaysController.getCloseDays(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      await closeDaysController.createCloseDays(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await closeDaysController.deleteCloseDays(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
module.exports = router;
