import mongoose, { Schema, Model } from "mongoose";

export interface IAppointment {
  barber_email: string;
  date: Date;
}

export interface IUserProfile {
  user_email: string;
  Appointments: IAppointment[];
}

const AppointmentSchema = new Schema<IAppointment>({
  barber_email: { type: String, required: true },
  date: { type: Date, required: true },
});

const UserProfileSchema = new Schema<IUserProfile>({
  user_email: { type: String, required: true },
  Appointments: { type: [AppointmentSchema], required: true },
});

export class UserProfileModel {
  private model: Model<IUserProfile>;

  constructor() {
    this.model = mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
  }

  async createUserProfile(data: IUserProfile): Promise<IUserProfile> {
    const newProfile = new this.model(data);
    return newProfile.save();
  }

  async findProfileByEmail(user_email: string): Promise<IUserProfile | null> {
    return this.model.findOne({ user_email }).lean().exec();
  }

  async deleteProfileByEmail(
    user_email: string
  ): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ user_email }).exec();
  }

  async createUserAppointment(
    user_email: string,
    appointment: IAppointment
  ): Promise<IUserProfile | null> {
    return this.model
      .findOneAndUpdate(
        { user_email },
        { $push: { Appointments: appointment } },
        { new: true }
      )
      .lean()
      .exec();
  }

  async deleteUserAppointment(
    user_email: string,
    appointmentId: string
  ): Promise<IUserProfile | null> {
    return this.model
      .findOneAndUpdate(
        { user_email },
        { $pull: { Appointments: { _id: appointmentId } } },
        { new: true }
      )
      .lean()
      .exec();
  }
}
