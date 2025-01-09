import { Request, Response, Router } from "express";
import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { PriceListController } from "../controller/PriceListeController";
import { sendResponse } from "../utils/conifg";
const router = Router();
const priceListController = new PriceListController();

const auth = new AuthentivateToken();
router
  .route("/PriceList")
  .get(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await priceListController.getPriceList(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  )
  .post(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await priceListController.createPriceList(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );

module.exports = router;
