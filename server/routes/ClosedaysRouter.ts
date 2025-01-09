import { Request, Response, Router } from "express";
import { CloseDaysController } from "../controller/CloseDaysController";
import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { sendResponse } from "../utils/conifg";
const router = Router();
const closeDaysController = new CloseDaysController();
const auth = new AuthentivateToken();
router
  .route("/closedays")
  .get(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await closeDaysController.getCloseDays(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  )
  .post(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await closeDaysController.createCloseDays(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  )
  .delete(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await closeDaysController.deleteCloseDays(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
module.exports = router;
