import { Request, Response } from "express";
import { UserProfileModel } from "../models/UserAppointments";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { EmailService } from "../utils/EmailControler";
import { AppDataSource } from "../utils/data-source";
import { User } from "../models/User";
import { add, parse } from "date-fns";
import { CreateAppointmentDTO } from "../DTOs/CreateAppointmentDTO";
import { GetLadenDTO } from "../DTOs/LadenDTO";
import { AppointmentsModel } from "../models/Laden/AppointmentsModel";
import { LadenModel } from "../models/Laden/LadenModel";
import { sendResponse } from "../utils/conifg";

export class AppointmentController {
  private userRepository = AppDataSource.getRepository(User);
  private modelAppointmentLaden: AppointmentsModel;
  private modelAppointmentUser: UserProfileModel;
  private modelMonogo: LadenModel;
  private emailS: EmailService;
  constructor() {
    this.modelAppointmentLaden = new AppointmentsModel();
    this.modelAppointmentUser = new UserProfileModel();
    this.modelMonogo = new LadenModel();
    this.emailS = new EmailService();
  }
  async getAppointmentLaden(req: Request, res: Response) {
    const getLadenDTO = plainToClass(GetLadenDTO, {
      email: req.params.email,
    });
    const errors = await validate(getLadenDTO);
    console.log(getLadenDTO);
    if (errors.length > 0) {
      return sendResponse(res, 400, errors);
    }
    const Laden_email = getLadenDTO.email;
    const appointments: any =
      await this.modelAppointmentLaden.getAppointmentBarberProfileByEmail(
        Laden_email
      );
    if (!appointments) return sendResponse(res, 404);

    const useres: any = await this.userRepository.find();
    const newArr: any = [];
    appointments.map((item: any) => {
      useres.map((newitem: any) => {
        if (item.user_email === newitem.email) {
          newArr.push({
            ...item,
            user_IMG: newitem.image,
          });
          return;
        }
      });
    });

    return sendResponse(res, 200, { status: true, appointments: newArr });
  }
  async getLadens() {
    const ladens = await this.modelMonogo.findByBarberes();
    return ladens;
  }
  async getAppointmentUser(req: Request, res: Response) {
    const User_email = req["user"]["email"];

    const appointments: any =
      await this.modelAppointmentUser.findProfileByEmail(User_email);
    if (!appointments) return sendResponse(res, 404);
    const ladens: any = await this.getLadens();
    const newData: any = [];
    appointments.Appointments.map((item: any) => {
      ladens.map((newitem: any) => {
        if (item.barber_email === newitem.barber_email) {
          newData.push({
            termin: item,
            barber_email: newitem.barber_email,
            Laden_name: newitem.Laden_name,
            Laden_IMG: newitem.Laden_IMG[0],
          });
          return;
        }
      });
    });
    return sendResponse(res, 200, { ...newData });
  }

  async createAppointment(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CreateAppointmentDTO, req.body);
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return sendResponse(res, 400, errors);
    }
    const { name, date, time, barber_email } = createLadenDTO;
    const user_email = req["user"]["email"];
    const dateNG = new Date(date);
    const updatedDate = add(dateNG, { days: 1 });

    const appointment =
      await this.modelAppointmentLaden.addAppointmentBarberProfileByEmail(
        barber_email,
        {
          user_email,
          name,
          date: updatedDate,
          time,
          status: true,
        }
      );
    if (!appointment) return sendResponse(res, 400);

    const apoLadenId: any = appointment.reserved_appointments.slice(-1)[0];

    await this.modelAppointmentUser.createUserAppointment(user_email, {
      barber_email,
      date,
      time: time,
      apoLadenId: apoLadenId._id,
    });
    const userData = await this.userRepository.findOne({
      where: { email: user_email },
    });
    const ladenData = await this.modelMonogo.findByBarberEmail(barber_email);
    const dt = updatedDate + "T" + time + ":00";
    const dates = parse(dt, "yyyyMMdd'T'HHmmss", new Date());

    const googleKalnderLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${
      ladenData?.Laden_name
    }&dates=${dates}&details=${
      "Ihren Termin Bei " + ladenData?.Laden_name
    }&location=${ladenData?.Laden_adress.ort}
    `;
    this.emailS.UserAppointmentResEmailAnUser(user_email, ladenData, userData, {
      subject: "Termin wurde erfolgreich gebucht",
      apo: {
        date: updatedDate,
        time,
      },
      googleKalnderLink,
    });
    this.emailS.barberAppointmentResEmailAnBaber(
      barber_email,
      ladenData,
      userData,
      {
        subject: "Neuer Termin bei Ihnen gebucht",
        apo: {
          date: updatedDate,
          time,
        },
        googleKalnderLink,
      }
    );
    return sendResponse(res, 200, { status: true, ...appointment });
  }
  async deleteAppointmentVonBarber(req: Request, res: Response) {
    const { barber_email, apoId, apoData } = req.body;
    const user_email = req["user"]["email"];
    const userData = await this.userRepository.findOne({
      where: { email: user_email },
    });
    const ladenData = await this.modelMonogo.findByBarberEmail(barber_email);
    const appointment =
      await this.modelAppointmentLaden.deleteAppointmentBarberProfileByEmail(
        barber_email,
        apoId
      );
    if (!appointment)
      return sendResponse(res, 400, {
        status: false,
        message: "Appointment Not Found",
      });
    await this.modelAppointmentUser.deleteUserAppointment(user_email, apoId);
    this.emailS.barberAppointmentDeletionEmailAnUser(
      user_email,
      ladenData,
      userData,
      {
        apoData,
        subject: "Ihr Termin wurde abgesagt",
      }
    );
    this.emailS.barberAppointmentDeletionEmailAnBarber(
      barber_email,
      ladenData,
      userData,
      {
        apoData,
        subject: "Terminlöschung erfolgreich",
      }
    );
    return sendResponse(res, 200);
  }
  async deleteAppointmentVonUser(req: Request, res: Response) {
    const { barber_email, apoId, apoData } = req.body;
    const user_email = req["user"]["email"];

    const userData = await this.userRepository.findOne({
      where: { email: user_email },
    });
    const ladenData = await this.modelMonogo.findByBarberEmail(barber_email);
    const appointment =
      await this.modelAppointmentLaden.deleteAppointmentBarberProfileByEmail(
        barber_email,
        apoId
      );
    if (!appointment) return sendResponse(res, 404);
    await this.modelAppointmentUser.deleteUserAppointment(user_email, apoId);

    this.emailS.UserAppointmentDeletionEmailAnUser(
      user_email,
      ladenData,
      userData,
      {
        apoData,
        subject: "Ihre Terminabsage wurde bestätigt",
      }
    );
    this.emailS.UserAppointmentDeletionEmailAnBarber(
      barber_email,
      ladenData,
      userData,
      {
        apoData,
        subject: "Ein Termin wurde vom Nutzer storniert",
      }
    );
    return sendResponse(res, 200);
  }
}
