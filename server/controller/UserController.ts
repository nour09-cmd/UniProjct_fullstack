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
import { ResetPasswordDTO, UserLoginDTO } from "../DTOs/LoginDTO";
import {  UserProfileModel } from "../models/UserAppointments";
import { EmailService } from "../utils/EmailControler";
import { IUserProfile } from "@mrx/barbar-finder";
// import { ImageUploads } from "../utils/UploadImages";

class UserLoginController {
  private userRepository = AppDataSource.getRepository(User);
  private emailS: EmailService;
  constructor() {
    this.emailS = new EmailService();
  }
  async getUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  async getUserWithToken(verifyToken: string) {
    return this.userRepository.findOne({ where: { verifyToken } });
  }
  async getUserWithPasswordToken(resetpasswordtoken: string) {
    return this.userRepository.findOne({ where: { resetpasswordtoken } });
  }
  async getUserData(req: Request, res: Response) {
    const emails = req["user"]["email"];
    const user = await this.getUser(emails);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { vorname, nachname, email, handynummer, image } = user;
    return res
      .status(200)
      .json({ vorname, nachname, email, handynummer, image });
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
  async VerifyEmail(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      const email = req["user"]?.["email"] || "";

      if (!token) {
        return res.status(400).json({ message: "Token not found" });
      }

      const userData = await this.getUserWithToken(token);
      if (!userData) {
        return res.status(400).json({ message: "Invalid token" });
      }

      userData.verifyToken = "";
      userData.verifyStatus = true;

      await this.userRepository.save(userData);
      this.emailS.AcceptedUserEmail(userData.email, userData, {
        subject: "Email verified successfully",
      });
      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Error during email verification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async resetPassword(req: Request, res: Response) {
    try {
      const userDTO = plainToClass(ResetPasswordDTO, req.body);
      const errors = await validate(userDTO);
      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const userData = await this.getUser(userDTO.email);
      if (!userData) {
        return res.status(400).json({ message: "Invalid email" });
      }
      const passwordToken = crypto.randomBytes(64).toString("hex");

      userData.password = await bcrypt.hash("changePassword000000", 10);
      userData.resetpasswordtoken = passwordToken;
      userData.resetPasswordStatus = true;
      await this.userRepository.save(userData);
      this.emailS.ResetPasswordEmail(userData.email, userData, {
        subject: "Passwort zurücksetzen für Ihr Barber-Finder-Konto",
        link: `http://localhost:4545/api/users/changePassword?token=${passwordToken}`,
      });

      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Error during email verification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async checkRoller(req: Request, res: Response) {
    try {
      const email = req["user"]?.["email"] || "";
      const user = await this.getUser(email);
      if (!user) {
        return res.status(400).json({ message: "Path Not Found" });
      }
      if (user.rolle === "BARBER") {
        return res.status(200).json({ User: false, barber: true });
      }
      return res.status(200).json({ User: true, barber: false });
    } catch (error) {
      console.error("Error during email verification:", error);
    }
  }
  async changePassword(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      const { password } = req.body;
      if (!password || !token) {
        return res
          .status(400)
          .json({ message: "Invalid no password or token" });
      }
      const userData = await this.getUserWithPasswordToken(token);
      if (!userData?.email) {
        return res.status(400).json({ message: "Invalid token" });
      }
      if (!userData?.resetpasswordtoken) {
        return res.status(400).json({
          message:
            "Your password action is not started pls click on restePassword first",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      userData.password = hashedPassword;
      userData.resetpasswordtoken = "";
      userData.resetPasswordStatus = false;
      await this.userRepository.save(userData);
      this.emailS.passwordChangedEmail(userData.email, userData, {
        subject: "Passwortänderung erfolgreich für Ihr Barber-Finder-Konto",
      });

      return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Error during email verification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

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

export { UserRegisterController, UserLoginController };
