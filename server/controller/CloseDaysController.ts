import { Request, Response } from "express";
import DatabaseConnection from "../utils/mongoDBconnection";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CloseDaysModel, LadenModel } from "../models/Laden";
import { CloseDaysDTO } from "./DTOs/CloseDaysDTO";

export class CloseDaysController {
  private modelLaden: LadenModel;
  private modelCloseDays: CloseDaysModel;
  private conn: DatabaseConnection;
  constructor() {
    this.modelLaden = new LadenModel();
    this.modelCloseDays = new CloseDaysModel();
    this.conn = new DatabaseConnection();
    this.conn.connect();
  }
  async createCloseDays(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CloseDaysDTO, {
      date: req.body.date,
      barberEmail: req.body.barberEmail, // TODO get the email from req.user with middelware
    });
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const laden = await this.modelLaden.findByBarberEmail(req.body.barberEmail);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }

    const createdDay =
      await this.modelCloseDays.addCloseDayBarberProfileByEmail(
        req.body.barberEmail,
        { date: new Date(req.body.date) }
      );
    return res
      .status(200)
      .json({ message: "Colse Day Date is created", createdDay });
  }
  async getCloseDays(req: Request, res: Response) {
    const barberEmail = req.body.barberEmail; // TODO get the email from req.user with middelware
    const laden = await this.modelLaden.findByBarberEmail(req.body.barberEmail);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }

    return res.status(200).json({ ...laden.close_days });
  }
  async deleteCloseDays(req: Request, res: Response) {
    const closeDayId = req.body.closeDayId;
    const barberEmail = req.body.barberEmail; // TODO get the email from req.user with
    const deleteDay =
      await this.modelCloseDays.deleteCloseDayBarberProfileByEmail(
        barberEmail,
        closeDayId
      );
    return res
      .status(200)
      .json({ message: "Close Day Date is deleted", deleteDay });
  }
  disstructor() {
    this.conn.disconnect();
  }
}
