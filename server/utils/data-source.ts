import { DataSource } from "typeorm";
import { Adresse } from "../models/Adresse";
import { User } from "../models/User";
import { DB_URIPOSTGRESQL } from "./conifg";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DB_URIPOSTGRESQL,
  synchronize: true,
  logging: false,
  entities: [Adresse, User],
  schema: "barber",
});
