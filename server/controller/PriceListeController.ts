import { Request, Response } from "express";
import DatabaseConnection from "../utils/mongoDBconnection";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { format } from "date-fns";
import { Validierunges } from "../utils/ValidierungsClasse";
import { LadenModel } from "models/Laden";

export class PriceListController {
  private modelPriceList: LadenModel;
  private conn: DatabaseConnection;
  constructor() {
    this.modelPriceList = new LadenModel();
    this.conn = new DatabaseConnection();
    this.conn.connect();
  }
  async getPriceList(req: Request, res: Response) {}
  async updatePriceList(req: Request, res: Response) {}
  async createPriceList(req: Request, res: Response) {}
  async deletePriceList(req: Request, res: Response) {}
}
