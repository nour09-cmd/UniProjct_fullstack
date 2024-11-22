import { IsDateString, IsEmail, IsNotEmpty } from "class-validator";

export class CloseDaysDTO {
  @IsDateString()
  @IsNotEmpty()
  date: string;
  // // TODO after middelware remove the email !!!!
  @IsEmail()
  @IsNotEmpty()
  barberEmail: string;
}
