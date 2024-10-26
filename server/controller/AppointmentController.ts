import { Request, Response } from "express";
import { AppointmentsModel } from "../models/Laden";
import { UserProfileModel } from "../models/UserAppointments";
import { CreateAppointmentDTO } from "../DTOs/AppointmentDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { GetLadenDTO } from "../DTOs/LadenDTO";

export class AppointmentController {
  private modelAppointmentLaden: AppointmentsModel;
  private modelAppointmentUser: UserProfileModel;

  constructor() {
    this.modelAppointmentLaden = new AppointmentsModel();
    this.modelAppointmentUser = new UserProfileModel();
  }
  async getAppointmentLaden(req: Request, res: Response) {
    const getLadenDTO = plainToClass(GetLadenDTO, req.body);
    const errors = await validate(getLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const Laden_email = req.body.email;
    const appointments =
      await this.modelAppointmentLaden.getAppointmentBarberProfileByEmail(
        Laden_email
      );
    if (!appointments)
      return res.status(400).json({ status: false, message: "User Not Found" });
    return res.status(200).json({ status: true, appointments });
  }
  async getAppointmentUser(req: Request, res: Response) {
    const User_email = req["user"]["email"];
    const appointments = await this.modelAppointmentUser.findProfileByEmail(
      User_email
    );
    if (!appointments)
      return res.status(400).json({ status: false, message: "User Not Found" });
    return res.status(200).json({ status: true, appointments });
  }

  async createAppointment(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CreateAppointmentDTO, req.body);
    // console.log(createLadenDTO);
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const { name, date, time, barber_email } = req.body;
    const user_email = req["user"]["email"];
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

    const apoLadenId: any = appointment.reserved_appointments.slice(-1)[0];

    await this.modelAppointmentUser.createUserAppointment(user_email, {
      barber_email,
      date,
      apoLadenId: apoLadenId._id,
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
