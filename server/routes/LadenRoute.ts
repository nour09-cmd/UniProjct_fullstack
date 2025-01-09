import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { LadenController } from "../controller/LadenController";
import { Request, Response, Router } from "express";
import { sendResponse } from "../utils/conifg";
const router = Router();
const ladenController = new LadenController();
const auth = new AuthentivateToken();

router.route("/getOneladens").post(async (req: Request, res: Response) => {
  try {
    await ladenController.getLadenByEmail(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router
  .route("/getladens")
  .get(async (req: Request, res: Response) => {
    try {
      await ladenController.getLadens(req, res);
    } catch (error) {
      sendResponse(res, 500, error.message);
    }
  })
  .post(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.createLaden(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  )
  .delete(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.deleteLadenByEmail(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  )
  .put(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.updateLaden(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );

router
  .route("/getladens/update")
  .post(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.updateLaden(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );

module.exports = router;
