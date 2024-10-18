import { Request, Response } from "express";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Rolle } from "../models/Rolle";
import { SECRET_KEY } from "../utils/conifg";
import { AppDataSource } from "../utils/data-source";
import { User } from "../models/User";
import { Adresse } from "../models/Adresse";

class UserLoginController {
  private userRepository = AppDataSource.getRepository(User);
  async getUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  createToken(email: string, name: string) {
    const token = jwt.sign({ name, email }, SECRET_KEY!, {
      expiresIn: "5h",
    });
    return token;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.getUser(email);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = password == user.password;
      // const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid possword" });
      }
      const name = `${user.vorname} ${user.nachname}`;
      const token = this.createToken(email, name);
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
  constructor() {
    this.rolle = Rolle.USER;
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
      const {
        email,
        password,
        vorname,
        nachname,
        adresse,
        handynummer,
        geburtsdatum,
      } = req.body;
      const { strasse, ort, plz } = adresse || {};

      if (
        !email ||
        !password ||
        !vorname ||
        !nachname ||
        !strasse ||
        !ort ||
        !plz
      ) {
        return res.status(400).json({
          error:
            "Missing required fields: email, password, vorname, nachname, adresse: {strasse, ort, plz}",
        });
      }

      const existingUser = await this.getUser(email);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const hashedPassword = password;
      // const hashedPassword = await bcrypt.hash(password, 10);

      const newAddress = this.adresseRepository.create({
        strasse,
        ort,
        plz,
      });
      const savedAddressId = await this.adresseRepository.save(newAddress);

      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
        vorname,
        nachname,
        rolle: this.rolle,
        adresse: savedAddressId,
        handynummer,
        geburtsdatum,
      });
      await this.userRepository.save(newUser);

      const name = `${vorname} ${nachname}`;
      const token = this.createToken(email, name);

      return res.status(201).json({
        message: "User registered successfully",
        token,
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
