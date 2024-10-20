import mongoose, { Schema, Document, Model } from "mongoose";

// Interface Definitions
interface IReviews {
  user_email: string;
  star: number;
}

interface IAppointment {
  user_email: string;
  name: string;
  date: Date;
  time: string;
  status: boolean;
}

interface ICloseDays {
  date: Date;
}

interface ILadenAddress {
  strasse: string;
  plz: string;
  ort: string;
}

interface IWeekdays {
  day: string;
  status: string;
  available_time_from: string;
  available_time_to: string;
  appointment_duration: number;
}

export interface ILaden {
  barber_email: string;
  Laden_name: string;
  Laden_description: string;
  Laden_IMG: string[];
  reviews: IReviews[];
  start_Abo_Date: string;
  end_Abo_Date: string;
  Laden_adress: ILadenAddress;
  week_days: IWeekdays[];
  reserved_appointments: IAppointment[];
  close_days: ICloseDays[];
}

// Schema Definitions
const reviewsSchema = new Schema<IReviews>({
  user_email: { type: String, required: true },
  star: { type: Number, required: true },
});

const appointmentSchema = new Schema<IAppointment>({
  user_email: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const closeDaysSchema = new Schema<ICloseDays>({
  date: { type: Date, required: true },
});

const ladenAddressSchema = new Schema<ILadenAddress>({
  strasse: { type: String, required: true },
  plz: { type: String, required: true },
  ort: { type: String, required: true },
});

const weekdaysSchema = new Schema<IWeekdays>({
  day: { type: String, required: true },
  status: { type: String, required: true },
  available_time_from: { type: String, required: true },
  available_time_to: { type: String, required: true },
  appointment_duration: { type: Number, required: true },
});

const ladenSchema = new Schema<ILaden>({
  barber_email: { type: String, required: true },
  Laden_name: { type: String, required: true },
  Laden_description: { type: String, required: true },
  Laden_IMG: { type: [String], required: true },
  reviews: { type: [reviewsSchema], required: true },
  start_Abo_Date: { type: String, required: true },
  end_Abo_Date: { type: String, required: true },
  Laden_adress: { type: ladenAddressSchema, required: true },
  week_days: { type: [weekdaysSchema], required: true },
  reserved_appointments: { type: [appointmentSchema], required: true },
  close_days: { type: [closeDaysSchema], required: true },
});

export class LadenModel {
  private model: Model<ILaden>;
  constructor() {
    this.model = mongoose.model<ILaden>("LadensProfile", ladenSchema);
  }

  async createLaden(data: ILaden): Promise<ILaden> {
    const newLaden = new this.model(data);
    return newLaden.save();
  }

  async findByBarberes(): Promise<ILaden[]> {
    return await this.model.find().lean().exec();
  }

  async findByBarberEmail(barber_email: string): Promise<ILaden | null> {
    return this.model.findOne({ barber_email }).lean().exec();
  }
  async deleteByBarberEmail(barber_email: string) {
    return await this.model.deleteOne({ barber_email: barber_email });
  }
  async updateBarberProfileByEmail(
    barber_email: string,
    data: Partial<ILaden>
  ): Promise<ILaden | null> {
    return this.model
      .findOneAndUpdate({ barber_email: barber_email }, data)
      .lean()
      .exec();
  }

  async getCloseDayBarberProfileByEmail(
    barber_email: string
  ): Promise<ICloseDays[] | null> {
    const laden = await this.model
      .findOne({ barber_email }, { close_days: 1 })
      .lean()
      .exec();
    return laden ? laden.close_days : null;
  }

  async addCloseDayBarberProfileByEmail(
    barber_email: string,
    closeDay: ICloseDays
  ): Promise<ILaden | null> {
    return this.model
      .findOneAndUpdate(
        { barber_email },
        { $push: { close_days: closeDay } },
        { new: true }
      )
      .lean()
      .exec();
  }

  async deleteCloseDayBarberProfileByEmail(
    barber_email: string,
    closeDayId: string
  ): Promise<ILaden | null> {
    return this.model
      .findOneAndUpdate(
        { barber_email },
        { $pull: { close_days: { _id: closeDayId } } },
        { new: true }
      )
      .lean()
      .exec();
  }

  async getWeekdaysTimeBarberProfileByEmail(
    barber_email: string
  ): Promise<IWeekdays[] | null> {
    const laden = await this.model
      .findOne({ barber_email }, { week_days: 1 })
      .lean()
      .exec();
    return laden ? laden.week_days : null;
  }

  async updateWeekdaysTimeBarberProfileByEmail(
    barber_email: string,
    weekDayData: IWeekdays
  ): Promise<ILaden | null> {
    return this.model
      .findOneAndUpdate(
        { barber_email, "week_days.day": weekDayData.day },
        { $set: { "week_days.$": weekDayData } },
        { new: true }
      )
      .lean()
      .exec();
  }

  async addAppointmentBarberProfileByEmail(
    barber_email: string,
    appointment: IAppointment
  ): Promise<ILaden | null> {
    return this.model
      .findOneAndUpdate(
        { barber_email },
        { $push: { reserved_appointments: appointment } },
        { new: true }
      )
      .lean()
      .exec();
  }

  async getAppointmentBarberProfileByEmail(
    barber_email: string
  ): Promise<IAppointment[] | null> {
    const laden = await this.model
      .findOne({ barber_email }, { reserved_appointments: 1 })
      .lean()
      .exec();
    return laden ? laden.reserved_appointments : null;
  }

  async deleteAppointmentBarberProfileByEmail(
    barber_email: string,
    appointmentId: string
  ): Promise<ILaden | null> {
    return this.model
      .findOneAndUpdate(
        { barber_email },
        { $pull: { reserved_appointments: { _id: appointmentId } } },
        { new: true }
      )
      .lean()
      .exec();
  }
}
