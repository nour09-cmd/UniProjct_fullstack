import { ILaden, LadenModel } from "../models/Laden";
import { Request, Response } from "express";
import DatabaseConnection from "../utils/mongoDBconnection";
import { CreateLadenDTO, GetLadenDTO } from "./DTOs/LadenDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { AddressDTO } from "./DTOs/RegisterDTO";
import WEEKDAYS from "../utils/defultWeekDays";
import { format } from "date-fns";
import { Validierunges } from "../utils/ValidierungsClasse";

export class LadenController {
  private modelMonogo: LadenModel;
  private conn: DatabaseConnection;
  constructor() {
    this.modelMonogo = new LadenModel();
    this.conn = new DatabaseConnection();
    this.conn.connect();
  }
  async getLadens(req: Request, res: Response) {
    const ladens = await this.modelMonogo.findByBarberes();
    return res.status(200).json({ ...ladens });
  }
  async getLadenByEmail(req: Request, res: Response) {
    const getLadenDTO = plainToClass(GetLadenDTO, req.body);
    const errors = await validate(getLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const { email } = req.body;
    const ladenData = await this.modelMonogo.findByBarberEmail(email);
    if (!ladenData) {
      return res.status(400).json({ message: "ladenData not Fund" });
    }
    return res.status(200).json({ ...ladenData });
  }
  async createLaden(req: Request, res: Response) {
    const createLadenDTO = plainToClass(CreateLadenDTO, req.body);
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const addressDTO = plainToClass(AddressDTO, req.body.Laden_adress);
    const addressDTO_errors = await validate(addressDTO);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ message: "Validation failed", addressDTO_errors });
    }
    const {
      barber_email,
      Laden_name,
      Laden_description,
      Laden_IMG,
      Laden_adress,
    } = req.body;

    const { strasse, ort, plz } = Laden_adress || {};
    const validierungesData = new Validierunges([
      barber_email,
      Laden_name,
      Laden_description,
      Laden_adress,
      strasse,
      ort,
      plz,
    ]);
    const arrData = await validierungesData.filterHtmlScrpitsSQL();
    const [
      barber_emails,
      Laden_names,
      Laden_descriptions,
      strasses,
      orts,
      plzs,
    ] = arrData;
    const findLaden = await this.modelMonogo.findByBarberEmail(barber_emails);
    if (findLaden) {
      return res
        .status(400)
        .json({ message: "this email have olready on Laden" });
    }
    const reserved_appointments = [];
    const close_days = [];
    const reviews = [];
    const date = format(new Date(), "yyyy-MM-dd");
    const start_Abo_Date = date;
    const end_Abo_Date = date;
    const newLaden: ILaden = {
      barber_email: barber_emails,
      Laden_name: Laden_names,
      Laden_description: Laden_descriptions,
      Laden_IMG: Laden_IMG,
      reviews: reviews,
      start_Abo_Date: start_Abo_Date,
      end_Abo_Date: end_Abo_Date,
      Laden_adress: { strasse: strasses, plz: plzs, ort: orts },
      week_days: WEEKDAYS,
      reserved_appointments: reserved_appointments,
      close_days: close_days,
      priceListe: [],
    };
    const createLaden = await this.modelMonogo.createLaden(newLaden);
    if (createLaden) {
      return res.status(200).json({ createLaden: true });
    }
  }
  async updateLaden(req: Request, res: Response) {
    // man kann auch das barber_emails von headerUser namen
    const { barber_email, data } = req.body;
    const findLaden = await this.modelMonogo.findByBarberEmail(barber_email);
    if (!findLaden) {
      return res.status(400).json({ message: "Laden not exsist " });
    }
    const { strasse, ort, plz } = data.Laden_adress || findLaden?.Laden_adress;
    let Laden_IMG = findLaden.Laden_IMG;
    let Laden_adress = { strasse, ort, plz };

    if (data.Laden_IMG.length > 0) {
      Laden_IMG = data.Laden_IMG;
    }
    if (data.Laden_adress) {
      Laden_adress = data.Laden_adress;
    }
    const newLaden = {
      Laden_name: data.Laden_name || findLaden.Laden_name,
      Laden_description: data.Laden_description || findLaden.Laden_description,
      Laden_IMG: Laden_IMG,
      Laden_adress: Laden_adress,
    };
    const validierungesData = new Validierunges([
      newLaden.Laden_name,
      newLaden.Laden_description,
      Laden_adress.strasse,
      Laden_adress.plz,
      Laden_adress.ort,
    ]);
    const arrData = await validierungesData.filterHtmlScrpits();
    const [Laden_names, Laden_descriptions, strasses, plzs, orts] = arrData;
    const clearDataLaden = {
      Laden_name: Laden_names,
      Laden_description: Laden_descriptions,
      Laden_IMG: Laden_IMG,
      Laden_adress: { strasse: strasses, plz: plzs, ort: orts },
    };

    const updateLaden = await this.modelMonogo.updateBarberProfileByEmail(
      barber_email,
      clearDataLaden
    );
    return res.status(200).json({ messager: true, data: clearDataLaden });
  }
  async deleteLadenByEmail(req: Request, res: Response) {
    const getLadenDTO = plainToClass(GetLadenDTO, req.body);
    const errors = await validate(getLadenDTO);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const { email } = req.body;
    const getLaden = await this.modelMonogo.findByBarberEmail(email);
    if (!getLaden) {
      return res.status(400).json({ message: "Laden not exsist " });
    }

    const ladenData = await this.modelMonogo.deleteByBarberEmail(email);

    return res.status(200).json({ message: "Laden is deleted", ladenData });
  }
  disstructor() {
    this.conn.disconnect();
  }
}
