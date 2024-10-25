import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsPostalCode,
  IsDateString,
  IsNumberString,
} from "class-validator";

export class GetLadenDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateAppointmentDTO {
  @IsEmail()
  @IsNotEmpty()
  user_email: string;
  @IsEmail()
  @IsNotEmpty()
  barber_eamil: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsDateString()
  @IsNotEmpty()
  date: Date;
  @IsNumberString()
  @IsNotEmpty()
  time: string;
}
