import { Request, Response } from "express";
import DatabaseConnection from "../utils/mongoDBconnection";
import { AppointmentsModel } from "../models/Laden";
import { UserProfileModel } from "../models/UserAppointments";
import { CreateAppointmentDTO } from "./DTOs/AppointmentDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class AppointmentController {
  private modelAppointmentLaden: AppointmentsModel;
  private modelAppointmentUser: UserProfileModel;

  private conn: DatabaseConnection;
  constructor() {
    this.modelAppointmentLaden = new AppointmentsModel();
    this.modelAppointmentUser = new UserProfileModel();
    this.conn = new DatabaseConnection();
    this.conn.connect();
  }
  async getAppointmentLaden(req: Request, res: Response) {
    const Laden_email = req.body.Laden_email; // TODO in router :Laden_email
    const appointments =
      this.modelAppointmentLaden.getAppointmentBarberProfileByEmail(
        Laden_email
      );
    if (!appointments)
      return res.status(400).json({ status: false, message: "User Not Found" });
    return res.status(200).json({ status: true, ...appointments });
  }
  // TODO create one schmea for user to save all his appointments
  async getAppointmentUser(req: Request, res: Response) {
    const User_email = req.params.User_email; // TODO from req.user.email with middlewares
    const appointments =
      this.modelAppointmentUser.findProfileByEmail(User_email);
    if (!appointments)
      return res.status(400).json({ status: false, message: "User Not Found" });
    return res.status(200).json({ status: true, ...appointments });
  }

  async createAppointment(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CreateAppointmentDTO, req.body);
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const { user_email, name, date, time, barber_email } = req.body;
    const appointment =
      await this.modelAppointmentLaden.addAppointmentBarberProfileByEmail(
        barber_email,
        {
          user_email,
          name,
          date,
          time,
          status: true,
        }
      );

    if (!appointment)
      return res
        .status(400)
        .json({ status: false, message: "Appointment Not Created" });
    await this.modelAppointmentUser.createUserAppointment(user_email, {
      barber_email,
      date,
    });
    return res.status(200).json({ status: true, ...appointment });
  }
  async deleteAppointment(req: Request, res: Response) {
    const { barber_email, user_email, apoId } = req.body;
    const appointment =
      await this.modelAppointmentLaden.deleteAppointmentBarberProfileByEmail(
        barber_email,
        apoId
      );
    if (!appointment)
      return res
        .status(400)
        .json({ status: false, message: "Appointment Not Found" });
    await this.modelAppointmentUser.deleteUserAppointment(user_email, apoId);
    return res
      .status(200)
      .json({ status: true, message: "Appointment Deleted" });
  }
}
