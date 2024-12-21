import mongoose, { Schema, Model } from "mongoose";
import {
  ILaden,
  IAppointment,
  ICloseDays,
  ILadenAddress,
  IReviews,
  IWeekdays,
  ISales,
  IPriceListe,
} from "@mrx/barbar-finder";

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
  date: { type: String, required: true },
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

export const ladenSchema = new Schema<ILaden>({
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




