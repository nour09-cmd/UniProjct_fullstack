import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { SECRET_KEY } from "../utils/conifg";
import { AppDataSource } from "../utils/data-source";
import { User } from "../models/User";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Validierunges } from "../utils/ValidierungsClasse";
import { ResetPasswordDTO, UserLoginDTO } from "../DTOs/LoginDTO";
import { EmailService } from "../utils/EmailControler";

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
export { UserLoginController };
