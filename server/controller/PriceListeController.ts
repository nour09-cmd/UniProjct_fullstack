import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreatePriceListArrDTO } from "../DTOs/PriceListeDTO";
import { LadenModel } from "../models/Laden/LadenModel";
import { PriceListeModel } from "../models/Laden/PriceListeModel";

export class PriceListController {
  private modelLaden: LadenModel;

  private modelPriceList: PriceListeModel;
  constructor() {
    this.modelLaden = new LadenModel();
    this.modelPriceList = new PriceListeModel();
  }
  async getPriceList(req: Request, res: Response) {
    const email = req["user"]["email"];
    const laden = await this.modelLaden.findByBarberEmail(email);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }
    return res.status(200).json({ priceListe: laden.priceListe });
  }
  async createPriceList(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CreatePriceListArrDTO, req.body);
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const email = req["user"]["email"];
    const laden = await this.modelLaden.findByBarberEmail(email);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }

    const createList =
      await this.modelPriceList.addPriceListeBarberProfileByEmail(
        email,
        req.body
      );
    return res
      .status(200)
      .json({ message: "PriceList is created", createList });
  }
}
