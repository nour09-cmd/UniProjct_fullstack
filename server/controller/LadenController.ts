import { ILaden } from "@mrx/barbar-finder";
import { Request, Response } from "express";
import { CreateLadenDTO, GetLadenDTO } from "../DTOs/LadenDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import WEEKDAYS from "../utils/defultWeekDays";
import { format } from "date-fns";
import { Validierunges } from "../utils/ValidierungsClasse";
import { User } from "../models/User";
import { AppDataSource } from "../utils/data-source";
import { Rolle } from "../models/Rolle";
import { LadenModel } from "../models/Laden/LadenModel";
import { sendResponse } from "../utils/conifg";

export class LadenController {
  private modelMonogo: LadenModel;
  private userRepository = AppDataSource.getRepository(User);
  constructor() {
    this.modelMonogo = new LadenModel();
  }
  async getLadens(req: Request, res: Response) {
    const ladens = await this.modelMonogo.findByBarberes();
    sendResponse(res, 200, ladens);
  }
  async getLadenByEmail(req: Request, res: Response) {
    const getLadenDTO = plainToClass(GetLadenDTO, req.body);
    const errors = await validate(getLadenDTO);
    if (errors.length > 0) {
      sendResponse(res, 400, errors);
    }
    const { email } = getLadenDTO;
    const ladenData = await this.modelMonogo.findByBarberEmail(email);
    if (!ladenData) {
      return sendResponse(res, 404);
    }
    ladenData.start_Abo_Date = "";
    ladenData.end_Abo_Date = "";
    sendResponse(res, 200, ladenData);
  }

  async getUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  async createLaden(req: Request, res: Response) {
    const barber_email = req["user"]["email"];
    const createLadenDTO = plainToClass(CreateLadenDTO, req.body);
    const errors = await validate(createLadenDTO);
    if (errors.length > 0) {
      sendResponse(res, 400, errors);
    }
    const check = await this.modelMonogo.findByBarberEmail(barber_email);
    if (check) {
      return sendResponse(res, 404);
    }
    const { Laden_name, Laden_description, Laden_IMG, Laden_adress } =
      createLadenDTO;

    const { strasse, ort, plz } = Laden_adress || {};
    const validierungesData = new Validierunges([
      Laden_name,
      Laden_description,
      strasse,
      ort,
      plz,
    ]);
    const arrData = await validierungesData.filterHtmlScrpitsSQL();
    const [Laden_names, Laden_descriptions, strasses, orts, plzs] = arrData;
    const findLaden = await this.modelMonogo.findByBarberEmail(barber_email);
    if (findLaden) {
      sendResponse(res, 409);
    }
    const reserved_appointments = [];
    const close_days = [];
    const reviews = [];
    const date = format(new Date(), "yyyy-MM-dd");
    const start_Abo_Date = date;
    const end_Abo_Date = date;

    const newLaden: ILaden = {
      barber_email: barber_email,
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
    if (!createLaden.barber_email) {
      return sendResponse(res, 400, { createLaden: false });
    }
    const User: any = await this.getUser(barber_email);
    User.rolle = Rolle.BARBER;
    await this.userRepository.save(User);
    return sendResponse(res, 201, createLaden);
  }

  async updateLaden(req: Request, res: Response) {
    const barber_email = req["user"]["email"];

    const data = req.body;
    const findLaden = await this.modelMonogo.findByBarberEmail(barber_email);
    if (!findLaden) {
      return sendResponse(res, 404);
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
    return sendResponse(res, 200, { messager: true, data: data });
  }
  async deleteLadenByEmail(req: Request, res: Response) {
    const email = req["user"]["email"];
    const getLaden = await this.modelMonogo.findByBarberEmail(email);
    if (!getLaden) {
      return sendResponse(res, 404);
    }

    const ladenData = await this.modelMonogo.deleteByBarberEmail(email);
    const User: any = this.getUser(email);
    User.Rolle = Rolle.USER;
    await this.userRepository.save(User);
    return sendResponse(res, 200, {
      message: "Laden is deleted",
      ladenData,
    });
  }
}
