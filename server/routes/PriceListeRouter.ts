import { Request, Response, Router } from "express";
import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { PriceListController } from "../controller/PriceListeController";
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
        res.status(500).json({ message: "Internal server error" });
      }
    }
  )
  .post(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await priceListController.createPriceList(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

module.exports = router;
