import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CloseDaysDTO } from "../DTOs/CloseDaysDTO";
import { GetLadenDTO } from "../DTOs/GetLadenDTO";
import { LadenModel } from "../models/Laden/LadenModel";
import { CloseDaysModel } from "../models/Laden/CloseDaysModel";

export class CloseDaysController {
  private modelLaden: LadenModel;
  private modelCloseDays: CloseDaysModel;
  constructor() {
    this.modelLaden = new LadenModel();
    this.modelCloseDays = new CloseDaysModel();
  }
  async createCloseDays(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CloseDaysDTO, {
      date: req.body.date,
      barberEmail: req["user"]["email"],
    });
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const laden = await this.modelLaden.findByBarberEmail(req["user"]["email"]);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }

    const createdDay =
      await this.modelCloseDays.addCloseDayBarberProfileByEmail(
        req["user"]["email"],
        { date: `${new Date(createLadenDTO.date)}` }
      );
    return res
      .status(200)
      .json({ message: "Colse Day Date is created", createdDay });
  }
  async getCloseDays(req: Request, res: Response) {
    const getLadenDTO = plainToClass(GetLadenDTO, req.body);
    const errors = await validate(getLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const laden = await this.modelLaden.findByBarberEmail(getLadenDTO.email);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }

    return res.status(200).json({ ...laden.close_days });
  }
  async deleteCloseDays(req: Request, res: Response) {
    const closeDayId = req.body.closeDayId;
    const barberEmail = req["user"]["email"];
    const deleteDay =
      await this.modelCloseDays.deleteCloseDayBarberProfileByEmail(
        barberEmail,
        closeDayId
      );
    return res
      .status(200)
      .json({ message: "Close Day Date is deleted", deleteDay });
  }
}
