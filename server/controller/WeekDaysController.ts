import { Request, Response } from "express";
import DatabaseConnection from "../utils/mongoDBconnection";
import { LadenModel, WeeksDaysModel } from "../models/Laden";

export class WeekDaysController {
  private modelWeeksDays: WeeksDaysModel;
  private modelLaden: LadenModel;

  private conn: DatabaseConnection;
  constructor() {
    this.modelWeeksDays = new WeeksDaysModel();
    this.modelLaden = new LadenModel();
    this.conn = new DatabaseConnection();
    this.conn.connect();
  }
  async getWeeksDays(req: Request, res: Response) {
    const barber_email = req.body.barberemail; // TODO from req.user.email with middlewares
    const weekDays = await this.modelLaden.findByBarberEmail(barber_email);
    if (!weekDays) return res.status(400).json({ message: "Laden Not Found" });
    return res.status(200).json({ ...weekDays.week_days });
  }
  async updateWeeksDays(req: Request, res: Response) {
    const barber_email = req.body.barberemail; // TODO from req.user.email with middlewares
    const { weekDays } = req.body;
    const weekDayss = await this.modelLaden.findByBarberEmail(barber_email);
    if (!weekDayss) return res.status(400).json({ message: "Laden Not Found" });
    const weekDaysdb = [...weekDays].map(async (item) => {
      const weekDaysdb =
        await this.modelWeeksDays.updateWeekdaysTimeBarberProfileByEmail(
          barber_email,
          item
        );
    });

    if (!weekDaysdb)
      return res.status(400).json({ message: "Laden Not Found" });

    return res.status(200).json({ message: "data is ollready update" });
  }
}
