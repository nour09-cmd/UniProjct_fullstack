import { IAppointment, ILaden } from "@mrx/barbar-finder";
import { ladenSchema } from "./LadenSchema";
import mongoose, {  Model } from "mongoose";
import DatabaseConnection from "../../utils/mongoDBconnection";

export class AppointmentsModel {
  private model: Model<ILaden>;
  private conn: DatabaseConnection;
  constructor() {
    this.conn = new DatabaseConnection();
    this.model = mongoose.model<ILaden>("LadensProfile", ladenSchema);
  }
  async addAppointmentBarberProfileByEmail(
    barber_email: string,
    appointment: IAppointment
  ): Promise<ILaden | null> {
    await this.conn.connect();
    console.log(barber_email);
    const data = await this.model
      .findOneAndUpdate(
        { barber_email: barber_email },
        { $push: { reserved_appointments: appointment } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }

  async getAppointmentBarberProfileByEmail(
    barber_email: string
  ): Promise<IAppointment[] | null> {
    await this.conn.connect();
    const laden = await this.model
      .findOne({ barber_email: barber_email }, { reserved_appointments: 1 })
      .lean()
      .exec();
    await this.conn.disconnect();
    return laden ? laden.reserved_appointments : [];
  }

  async deleteAppointmentBarberProfileByEmail(
    barber_email: string,
    appointmentId: string
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOneAndUpdate(
        { barber_email: barber_email },
        { $pull: { reserved_appointments: { _id: appointmentId } } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }
}
