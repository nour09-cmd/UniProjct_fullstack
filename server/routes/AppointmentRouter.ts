import { AuthentivateToken } from "../middlewares/authenticateTokenAndCheckRole";
import { AppointmentController } from "../controller/AppointmentController";
import { Request, Response, Router } from "express";

const router = Router();
const appointmentController = new AppointmentController();
const auth = new AuthentivateToken();
router
  .route("/getAppointmentUser")
  .get(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await appointmentController.getAppointmentUser(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
router
  .route("/getAppointmentLaden/:email")
  .get(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await appointmentController.getAppointmentLaden(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
router
  .route("/appointment")
  .post(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await appointmentController.createAppointment(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal 123 server error" });
      }
    }
  );

router
  .route("/AppointmentVonUser")
  .post(
    auth.authenticateToken.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await appointmentController.deleteAppointmentVonUser(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
router
  .route("/AppointmentVonBarber")
  .post(
    auth.authenticateTokenBarber.bind(auth),
    async (req: Request, res: Response) => {
      try {
        await appointmentController.deleteAppointmentVonBarber(req, res);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
module.exports = router;
