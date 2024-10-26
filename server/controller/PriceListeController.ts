import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { LadenModel, PriceListeModel } from "../models/Laden";
import { GetLadenDTO } from "../DTOs/AppointmentDTO";
import { CreatePriceListDTO } from "../DTOs/PriceListeDTO";

export class PriceListController {
  private modelLaden: LadenModel;

  private modelPriceList: PriceListeModel;
  constructor() {
    this.modelLaden = new LadenModel();
    this.modelPriceList = new PriceListeModel();
  }
  async getPriceList(req: Request, res: Response) {
    // MAN kann auch weg lassen !!!
    const PriceListDTO = plainToClass(GetLadenDTO, {
      email: req.body.email,
    });
    const errors = await validate(PriceListDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const laden = await this.modelLaden.findByBarberEmail(PriceListDTO.email);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }
    return res.status(200).json({ priceListe: laden.priceListe });
  }
  async createPriceList(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CreatePriceListDTO, req.body);
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const email = req["user"]["email"];
    const laden = await this.modelLaden.findByBarberEmail(email);
    if (!laden) {
      return res.status(400).json({ message: "Laden Not Found" });
    }
    const list = {
      category: createLadenDTO.category,
      sales: createLadenDTO.sales,
    };
    const createList = this.modelPriceList.addPriceListeBarberProfileByEmail(
      email,
      list
    );
    return res
      .status(200)
      .json({ message: "PriceList is created", createList });
  }
  async updatePriceList(req: Request, res: Response) {
    const updateLadenDTO = plainToClass(CreatePriceListDTO, req.body);
    const errors = await validate(updateLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const email = req["user"]["email"];
    const list = {
      _id: req.body.listId,
      category: updateLadenDTO.category,
      sales: updateLadenDTO.sales,
    };
    /// TODO update
    const updateList = this.modelPriceList.updatePriceListeBarberProfileByEmail(
      email,
      list
    );
    return res
      .status(200)
      .json({ message: "PriceList is updated", updateList });
  }
  async deletePriceList(req: Request, res: Response) {
    const email = req["user"]["email"];
    const deleteList =
      await this.modelPriceList.deletePriceListeBarberProfileByEmail(
        email,
        req.body.listId
      );
    return res
      .status(200)
      .json({ message: "Close Day Date is deleted", deleteList });
  }
}
