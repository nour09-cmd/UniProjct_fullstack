import { IsString, IsEmail, IsNotEmpty, IsDateString } from "class-validator";

export class GetLadenDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateAppointmentDTO {
  @IsEmail()
  @IsNotEmpty()
  barber_email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @IsString()
  @IsNotEmpty()
  time: string;
}
