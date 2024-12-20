import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { LadenController } from "../controller/LadenController";
import { Request, Response, Router } from "express";
const router = Router();
const ladenController = new LadenController();
const auth = new AuthentivateToken();

router.route("/getOneladens").post(
  // auth.authenticateToken.bind(auth),
  async (req: Request, res: Response) => {
    try {
      await ladenController.getLadenByEmail(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
router
  .route("/getladens")
  .get(
    // auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.getLadens(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  )
  .post(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.createLaden(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  )
  .delete(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.deleteLadenByEmail(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  )
  .put(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await ladenController.updateLaden(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
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
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

module.exports = router;
