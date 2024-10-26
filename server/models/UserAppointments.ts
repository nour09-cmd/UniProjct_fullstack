import mongoose, { Schema, Model } from "mongoose";
import DatabaseConnection from "../utils/mongoDBconnection";

export interface IAppointment {
  barber_email: string;
  apoLadenId: string;
  date: Date;
}

export interface IUserProfile {
  user_email: string;

  Appointments: IAppointment[];
}

const AppointmentSchema = new Schema<IAppointment>({
  barber_email: { type: String, required: true },
  apoLadenId: { type: String, required: true },
  date: { type: Date, required: true },
});

const UserProfileSchema = new Schema<IUserProfile>({
  user_email: { type: String, required: true },
  Appointments: { type: [AppointmentSchema], required: true },
});

export class UserProfileModel {
  private model: Model<IUserProfile>;
  private conn: DatabaseConnection;
  constructor() {
    this.conn = new DatabaseConnection();
    this.model = mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
  }

  async createUserProfile(data: IUserProfile): Promise<IUserProfile> {
    await this.conn.connect();
    const newProfile = new this.model(data);
    const datas = await newProfile.save();
    await this.conn.disconnect();

    return datas;
  }

  async findProfileByEmail(user_email: string): Promise<IUserProfile | null> {
    await this.conn.connect();
    const profile = await this.model
      .findOne({ user_email: user_email })
      .lean()
      .exec();
    await this.conn.disconnect();
    return profile;
  }

  async deleteProfileByEmail(
    user_email: string
  ): Promise<{ deletedCount?: number }> {
    await this.conn.connect();
    const deletedCount = await this.model.deleteOne({ user_email }).exec();
    await this.conn.disconnect();
    return deletedCount;
  }

  async createUserAppointment(
    user_email: string,
    appointment: IAppointment
  ): Promise<IUserProfile | null> {
    await this.conn.connect();
    const profile = await this.model
      .findOneAndUpdate(
        { user_email },
        { $push: { Appointments: appointment } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return profile;
  }

  async deleteUserAppointment(
    user_email: string,
    appointmentId: string
  ): Promise<IUserProfile | null> {
    await this.conn.connect();
    const profile = await this.model
      .findOneAndUpdate(
        { user_email },
        { $pull: { Appointments: { apoLadenId: appointmentId } } },
        { new: true }
      )
      .lean()
      .exec();
    return profile;
  }
}
