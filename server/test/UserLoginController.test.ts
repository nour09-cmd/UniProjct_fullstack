import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserLoginController } from "../controller/UserRegisterController";
import { validate } from "class-validator";
import { UserLoginDTO } from "../DTOs/LoginDTO";
import { User } from "../models/User";
import { Adresse } from "models/Adresse";

jest.mock("bcryptjs");

describe("UserLoginController", () => {
  let userLoginController: UserLoginController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    userLoginController = new UserLoginController();

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("login", () => {
    it("should return 400 if validation fails", async () => {
      // Simuliere ungültige Eingabe
      req.body = {};

      await userLoginController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Validation failed",
        errors: expect.any(Array),
      });
    });

    it("should return 404 if user is not found", async () => {
      // Simuliere gültige Eingabe
      req.body = { email: "testuser@example.com", password: "password123" };

      // Mock für getUser
      jest.spyOn(userLoginController, "getUser").mockResolvedValue(null);

      await userLoginController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("should return 401 if password is incorrect", async () => {
      req.body = { email: "testuser@example.com", password: "wrongpassword" };

      const mockUser: any = {
        email: "testuser@example.com",
        password: "hashedPassword",
      };

      // Mock für getUser
      jest.spyOn(userLoginController, "getUser").mockResolvedValue(mockUser);

      // Mock für bcrypt.compare
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await userLoginController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid possword" });
    });

    it("should return 200 with a token if login is successful", async () => {
      req.body = { email: "testuser@example.com", password: "correctpassword" };
      const mockAdress: Adresse = {
        id: 2131,
        ort: "worms",
        plz: "67549",
        strasse: "bebelstr",
      };
      const mockUser: User = {
        id: 12,
        email: "testuser@example.com",
        password: "hashedPassword",
        vorname: "John",
        nachname: "Doe",
        handynummer: "017631449793",
        geburtsdatum: new Date("09.05.2001"),
        image: "",
        adresse: mockAdress,
        rolle: "USER",
        verifyToken: "",
      };

      jest.spyOn(userLoginController, "getUser").mockResolvedValue(mockUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      jest
        .spyOn(userLoginController, "createToken")
        .mockReturnValue("mockedToken");

      await userLoginController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "mockedToken" });
    });
  });
});
