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
import { UserRegisterDTO } from "../DTOs/RegisterDTO";
import { validate } from "class-validator";
import { Validierunges } from "../utils/ValidierungsClasse";
import { UserProfileModel } from "../models/UserAppointments";
import { EmailService } from "../utils/EmailControler";
import { IUserProfile } from "@mrx/barbar-finder";

class UserRegisterController {
  private userRepository = AppDataSource.getRepository(User);
  private adresseRepository = AppDataSource.getRepository(Adresse);
  // private imageUpload: ImageUploads;
  private rolle: string;
  private modelAppointmentUser: UserProfileModel;
  private emailS: EmailService;
  constructor() {
    this.rolle = Rolle.USER;
    this.modelAppointmentUser = new UserProfileModel();
    this.emailS = new EmailService();
    // this.imageUpload = new ImageUploads();
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
        image: req.body.image || "",
        email: emails,
        password: hashedPassword,
        vorname: vornames,
        nachname: nachnames,
        rolle: this.rolle,
        adresse: savedAddressId,
        handynummer: handynummers,
        geburtsdatum: geburtsdatums,
        verifyToken: emailToken,
        verifyStatus: false,
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
      const sendMail = this.emailS.firstRegisterEmail(
        emails,
        {
          email: emails,
          name: vornames + " " + nachnames,
          rolle: this.rolle,
          adresse: savedAddressId,
          handynummer: handynummers,
          geburtsdatum: geburtsdatums,
        },
        {
          subject: "Bitte bestätigen Sie Ihre E-Mail-Adresse",
          link: `http://localhost:4545/api/users/VerifyEmail?token=${emailToken}`,
        }
      );
      return res.status(201).json({
        message: "User registered successfully",
        token,
        createProfileUser,
        sendMail,
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

export { UserRegisterController };
