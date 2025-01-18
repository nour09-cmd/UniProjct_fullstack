import { IsEmail, IsNotEmpty } from "class-validator";
export class GetLadenDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
