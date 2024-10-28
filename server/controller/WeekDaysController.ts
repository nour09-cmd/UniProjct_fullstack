import { Request, Response } from "express";
import { LadenModel, WeeksDaysModel } from "../models/Laden";
import { GetLadenDTO } from "../DTOs/AppointmentDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { WeekDaysDTO } from "../DTOs/WeeksdaysDTO";

export class WeekDaysController {
  private modelWeeksDays: WeeksDaysModel;
  private modelLaden: LadenModel;

  constructor() {
    this.modelWeeksDays = new WeeksDaysModel();
    this.modelLaden = new LadenModel();
  }
  async getWeeksDays(req: Request, res: Response) {
    const getLadenDTO = plainToClass(GetLadenDTO, req.body);
    const errors = await validate(getLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const weekDays = await this.modelLaden.findByBarberEmail(getLadenDTO.email);
    if (!weekDays) return res.status(400).json({ message: "Laden Not Found" });
    return res.status(200).json({ ...weekDays.week_days });
  }
  async updateWeeksDays(req: Request, res: Response) {
    const weekDaysDTO = plainToClass(WeekDaysDTO, req.body);
    const errors = await validate(weekDaysDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const barber_email = req["user"]["email"];
    const { weekDays } = weekDaysDTO;
    const weekDayss = await this.modelLaden.findByBarberEmail(barber_email);
    if (!weekDayss) return res.status(400).json({ message: "Laden Not Found" });

    const weekDaysdb =
      await this.modelWeeksDays.updateWeekdaysTimeBarberProfileByEmail(
        barber_email,
        weekDays
      );

    if (!weekDaysdb)
      return res.status(400).json({ message: "Laden Not Found" });

    return res.status(200).json({ message: "data is ollready update" });
  }
}
