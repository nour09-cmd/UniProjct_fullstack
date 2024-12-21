import { IsDateString, IsEmail, IsNotEmpty } from "class-validator";
import { ICloseDays } from "@mrx/barbar-finder";

export class CloseDaysDTO implements ICloseDays {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsEmail()
  @IsNotEmpty()
  barberEmail: string;
}
