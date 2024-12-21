import { ILaden, IPriceListe } from "@mrx/barbar-finder";
import { ladenSchema } from "./LadenSchema";
import mongoose, {  Model } from "mongoose";
import DatabaseConnection from "../../utils/mongoDBconnection";
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
