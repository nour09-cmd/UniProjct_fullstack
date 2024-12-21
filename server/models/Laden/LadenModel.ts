import { ILaden } from "@mrx/barbar-finder";
import { ladenSchema } from "./LadenSchema";
import mongoose, { Schema, Model } from "mongoose";
import DatabaseConnection from "../../utils/mongoDBconnection";
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

}
