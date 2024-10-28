import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Rolle } from "../models/Rolle";
import { SECRET_KEY } from "../utils/conifg";
import { AppDataSource } from "../utils/data-source";
import { User } from "../models/User";
import { Adresse } from "../models/Adresse";
import { plainToClass } from "class-transformer";
import { AddressDTO, UserRegisterDTO } from "../DTOs/RegisterDTO";
import { validate } from "class-validator";
import { Validierunges } from "../utils/ValidierungsClasse";
import { UserLoginDTO } from "../DTOs/LoginDTO";
import { IUserProfile, UserProfileModel } from "../models/UserAppointments";

class UserLoginController {
  private userRepository = AppDataSource.getRepository(User);

  async getUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  async getUserData(req: Request, res: Response) {
    const emails = req["user"]["email"];
    const user = await this.getUser(emails);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { vorname, nachname, email, handynummer } = user;
    return res.status(200).json({ vorname, nachname, email, handynummer });
  }
  createToken(email: string, name: string) {
    const token = jwt.sign({ name, email }, SECRET_KEY!, {
      expiresIn: "5h",
    });
    return token;
  }

  async login(req: Request, res: Response) {
    try {
      const userDTO = plainToClass(UserLoginDTO, req.body);
      const errors = await validate(userDTO);
      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }
      const { email, password } = userDTO;
      const validierungesData = new Validierunges([email, password]);
      const arrData = await validierungesData.filterHtmlScrpitsSQL();
      const [emails, passwords] = arrData;

      const user = await this.getUser(emails);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // const isPasswordValid = password == user.password;
      const isPasswordValid = await bcrypt.compare(passwords, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid possword" });
      }
      const name = `${user.vorname} ${user.nachname}`;
      const token = this.createToken(emails, name);
      return res.status(200).json({ token });
    } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

class UserRegisterController {
  private userRepository = AppDataSource.getRepository(User);
  private adresseRepository = AppDataSource.getRepository(Adresse);
  private rolle: string;
  private modelAppointmentUser: UserProfileModel;

  constructor() {
    this.rolle = Rolle.USER;
    this.modelAppointmentUser = new UserProfileModel();
  }

  createToken(email: string, name: string) {
    const token = jwt.sign({ name, email }, SECRET_KEY!, {
      expiresIn: "5h",
    });
    return token;
  }

  async getUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async signUp(req: Request, res: Response) {
    try {
      const userDTO = plainToClass(UserRegisterDTO, req.body);
      const errors = await validate(userDTO);
      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }
      const {
        email,
        password,
        vorname,
        nachname,
        handynummer,
        geburtsdatum,
        address,
      } = userDTO;
      const { strasse, ort, plz } = address || {};
      // Kann auch weg !!!
      const validierungesData = new Validierunges([
        email,
        password,
        vorname,
        nachname,
        handynummer,
        geburtsdatum,
        strasse,
        ort,
        plz,
      ]);
      const arrData = await validierungesData.filterHtmlScrpitsSQL();

      const [
        emails,
        passwords,
        vornames,
        nachnames,
        handynummers,
        geburtsdatums,
        strasses,
        orts,
        plzs,
      ] = arrData;

      const existingUser = await this.getUser(emails);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      // const hashedPassword = password;
      const hashedPassword = await bcrypt.hash(passwords, 10);

      const newAddress = this.adresseRepository.create({
        strasse: strasses,
        ort: orts,
        plz: plzs,
      });
      const savedAddressId = await this.adresseRepository.save(newAddress);
      //
      const emailToken = crypto.randomBytes(64).toString("hex");
      const newUser = this.userRepository.create({
        email: emails,
        password: hashedPassword,
        vorname: vornames,
        nachname: nachnames,
        rolle: this.rolle,
        adresse: savedAddressId,
        handynummer: handynummers,
        geburtsdatum: geburtsdatums,
        verifyToken: emailToken,
        verifyStatus: true,
        resetpasswordtoken: "null",
        resetPasswordStatus: false,
      });
      await this.userRepository.save(newUser);

      const name = `${vornames} ${nachnames}`;
      const token = this.createToken(emails, name);
      const data: IUserProfile = {
        user_email: emails,
        Appointments: [],
      };
      const createProfileUser =
        this.modelAppointmentUser.createUserProfile(data);
      return res.status(201).json({
        message: "User registered successfully",
        token,
        createProfileUser,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  }
}

export { UserRegisterController, UserLoginController };
