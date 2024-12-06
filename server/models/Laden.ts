import mongoose, { Schema, Model } from "mongoose";
import DatabaseConnection from "../utils/mongoDBconnection";

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
interface ISales {
  name: string;
  price: number;
  descriptions: string;
  img: string;
}
interface IPriceListe {
  category: string;
  sales: ISales[];
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
  priceListe: IPriceListe[];
}

// Schema Definitions
const salesSchema = new Schema<ISales>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  descriptions: { type: String },
  img: { type: String },
});
const priceListeSchema = new Schema<IPriceListe>({
  category: { type: String, required: true },
  sales: { type: [salesSchema], required: true },
});
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
  reserved_appointments: { type: [appointmentSchema] },
  close_days: { type: [closeDaysSchema] },
  priceListe: { type: [priceListeSchema] },
});

export class LadenModel {
  private model: Model<ILaden>;
  private conn: DatabaseConnection;
  constructor() {
    this.conn = new DatabaseConnection();

    this.model = mongoose.model<ILaden>("LadensProfile", ladenSchema);
  }

  async createLaden(data: ILaden): Promise<ILaden> {
    await this.conn.connect();
    const newLaden = new this.model(data);
    const datas = await newLaden.save();
    await this.conn.disconnect();
    return datas;
  }

  async findByBarberes(): Promise<ILaden[]> {
    await this.conn.connect();
    const data = await this.model.find().lean().exec();
    await this.conn.disconnect();

    return data;
  }

  async findByBarberEmail(barber_email: string): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOne({ barber_email: barber_email })
      .lean()
      .exec();
    await this.conn.disconnect();

    return data;
  }
  async deleteByBarberEmail(barber_email: string) {
    await this.conn.connect();
    const data = await this.model.deleteOne({ barber_email: barber_email });
    await this.conn.disconnect();
    return data;
  }
  async updateBarberProfileByEmail(
    barber_email: string,
    data: Partial<ILaden>
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const updatedLaden = await this.model
      .findOneAndUpdate({ barber_email: barber_email }, data)
      .lean()
      .exec();
    return updatedLaden;
  }

  // ---------------------------------------------------------
}

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

export class PriceListeModel {
  private model: Model<ILaden>;
  private conn: DatabaseConnection;
  constructor() {
    this.conn = new DatabaseConnection();
    this.model = mongoose.model<ILaden>("LadensProfile", ladenSchema);
  }

  async addPriceListeBarberProfileByEmail(
    barber_email: string,
    PriceListe: IPriceListe[]
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOneAndUpdate(
        { barber_email: barber_email },
        { priceListe: PriceListe },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }

  async updatePriceListeBarberProfileByEmail(
    barber_email: string,
    PriceListe: any
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOneAndUpdate(
        { barber_email, "priceListe._id": PriceListe._id },
        { $set: { "priceListe.$": PriceListe } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }
  async deletePriceListeBarberProfileByEmail(
    barber_email: string,
    priceListe: string
  ): Promise<ILaden | null> {
    await this.conn.connect();
    const data = await this.model
      .findOneAndUpdate(
        { barber_email },
        { $pull: { priceListe: { _id: priceListe } } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }
}
