import { ICloseDays, ILaden } from "@mrx/barbar-finder";
import DatabaseConnection from "../../utils/mongoDBconnection";
import { ladenSchema } from "./LadenSchema";
import mongoose, { Schema, Model } from "mongoose";

export class CloseDaysModel {
  private model: Model<ILaden>;
  private conn: DatabaseConnection;
  constructor() {
    this.conn = new DatabaseConnection();
    this.model = mongoose.model<ILaden>("LadensProfile", ladenSchema);
  }

  async addCloseDayBarberProfileByEmail(
    barber_email: string,
    closeDay: ICloseDays
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOneAndUpdate(
        { barber_email: barber_email },
        { $push: { close_days: closeDay } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }

  async deleteCloseDayBarberProfileByEmail(
    barber_email: string,
    closeDayId: string
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOneAndUpdate(
        { barber_email },
        { $pull: { close_days: { _id: closeDayId } } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }
}