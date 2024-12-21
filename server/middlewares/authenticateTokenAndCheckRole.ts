import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../utils/conifg";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppDataSource } from "../utils/data-source";

export class AuthentivateToken {
  private userRepository = AppDataSource.getRepository(User);
  async getUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
    const token = authHeader;

    if (!token)
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const { name, email } = decoded;
      const user = await this.getUser(email);
      if (!user)
        return res
          .status(401)
          .send({ message: "Access denied. Invalid token." });

      req["user"] = { name, email };

      next();
    } catch (error) {
      return res.status(400).send({ message: "Invalid token" });
    }
  }

  async authenticateTokenBarber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.header("Authorization");
    const token = authHeader;

    if (!token)
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const { name, email } = decoded;
      const user = await this.getUser(email);
      if (!user)
        return res
          .status(401)
          .send({ message: "Access denied. Invalid token." });

      req["user"] = { name, email };
      if (user["rolle"] != "BARBER")
        return res
          .status(401)
          .send({ message: "Access denied. you must by barber" });
      next();
    } catch (error) {
      return res.status(400).send({ message: "Invalid token" });
    }
  }
  async authenticateTokenAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.header("Authorization");
    const token = authHeader;

    if (!token)
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const { name, email } = decoded;
      const user = await this.getUser(email);
      if (!user)
        return res
          .status(401)
          .send({ message: "Access denied. Invalid token." });

      req["user"] = { name, email };
      if (user["rolle"] != "ADMIN")
        return res
          .status(401)
          .send({ message: "Access denied. you must by barber" });
      next();
    } catch (error) {
      return res.status(400).send({ message: "Invalid token" });
    }
  }
}
