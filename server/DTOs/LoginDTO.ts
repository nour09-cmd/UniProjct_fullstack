import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResetPasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
