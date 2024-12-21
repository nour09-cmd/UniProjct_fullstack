
import { ILaden } from "@mrx/barbar-finder";
import { ladenSchema } from "./LadenSchema";
import mongoose, { Schema, Model } from "mongoose";
import DatabaseConnection from "../../utils/mongoDBconnection";
export class WeeksDaysModel {
  private model: Model<ILaden>;
  private conn: DatabaseConnection;
  constructor() {
    this.conn = new DatabaseConnection();

    this.model = mongoose.model<ILaden>("LadensProfile", ladenSchema);
  }

  async updateWeekdaysTimeBarberProfileByEmail(
    barber_email: string,
    weekDayData: any
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOneAndUpdate(
        { barber_email },
        { $set: { week_days: weekDayData } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }
}