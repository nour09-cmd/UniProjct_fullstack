import { Request, Response } from "express";
import { GetLadenDTO } from "../DTOs/GetLadenDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { WeekDaysDTO } from "../DTOs/WeeksdaysDTO";
import { WeeksDaysModel } from "../models/Laden/WeeksDaysModel";
import { LadenModel } from "../models/Laden/LadenModel";
import { sendResponse } from "../utils/conifg";

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
      return sendResponse(res, 400, errors);
    }
    const weekDays = await this.modelLaden.findByBarberEmail(getLadenDTO.email);

    if (!weekDays) return sendResponse(res, 404);
    return res.status(200).json({ ...weekDays.week_days });
  }
  async updateWeeksDays(req: Request, res: Response) {
    const weekDaysDTO = plainToClass(WeekDaysDTO, req.body);
    const errors = await validate(weekDaysDTO);
    if (errors.length > 0) {
      return sendResponse(res, 400, errors);
    }
    const barber_email = req["user"]["email"];
    const { weekDays } = weekDaysDTO;
    const weekDayss = await this.modelLaden.findByBarberEmail(barber_email);

    if (!weekDayss) return sendResponse(res, 404);

    const weekDaysdb =
      await this.modelWeeksDays.updateWeekdaysTimeBarberProfileByEmail(
        barber_email,
        weekDays
      );
    if (!weekDaysdb) return sendResponse(res, 404);
    return sendResponse(res, 200, { message: "data is ollready update" });
  }
}
