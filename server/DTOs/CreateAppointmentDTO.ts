import { IsString, IsEmail, IsNotEmpty } from "class-validator";
export class CreateAppointmentDTO {
  @IsEmail()
  @IsNotEmpty()
  barber_email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  date: Date;
  @IsString()
  @IsNotEmpty()
  time: string;
}
