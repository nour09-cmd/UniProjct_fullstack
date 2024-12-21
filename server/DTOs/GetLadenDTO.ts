import { IsEmail, IsNotEmpty } from "class-validator";
// TODO InterFaces
export class GetLadenDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
