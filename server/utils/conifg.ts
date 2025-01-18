import { Response } from "express";

export const PORT = 4545;
// export const DB_URIMONGODB = "mongodb://localhost:27017/";
export const DB_URIMONGODB = "mongodb://mongodbNonosql:27017/";

// export const DB_URIPOSTGRESQL = "postgresql://admin:test@localhost:5432/barber";
export const DB_URIPOSTGRESQL =
  "postgresql://postgres:postgres@postgresSQLdb:5432/barber";

export const SECRET_KEY = "tRuBEf1A0l8Heth3qAgO";
export const EMAIL = "gmn09000@gmail.com";
export const PASSEWD = "iunb hhgy hqln cpzm";
export const FRONDENDSUPPORT = "http://localhost:3000/contact";
export const FRONDENDLOGIN = "http://localhost:3000/Login";
export const TERMINURL = "http://localhost:3000/contact";
export const SHOPNAME = "Barber Finder";
export const SUPPORT = "http://localhost:3000/contact";

const HttpStatus: Record<number, string> = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  503: "Service Unavailable",
  409: "already exists",
};

export function sendResponse(
  res: Response,
  statusCode: number,
  data: any = ""
) {
  if (statusCode == 200) {
    return res.status(statusCode).json({
      ...data,
    });
  } else {
    return res.status(statusCode).json({
      status: statusCode,
      message: HttpStatus[statusCode],
      err: data,
    });
  }
}
