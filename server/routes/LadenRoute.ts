import { LadenController } from "../controller/LadenController";
import { Request, Response, Router } from "express";
const router = Router();
const ladenController = new LadenController();
router.route("/getOneladens").get(async (req: Request, res: Response) => {
  try {
    await ladenController.getLadenByEmail(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router
  .route("/getladens")
  .get(async (req: Request, res: Response) => {
    try {
      await ladenController.getLadens(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      await ladenController.createLaden(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await ladenController.deleteLadenByEmail(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      await ladenController.updateLaden(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
