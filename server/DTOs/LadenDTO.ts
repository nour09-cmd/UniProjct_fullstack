import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsPostalCode,
  ValidateNested,
} from "class-validator";
// TODO InterFaces
export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  strasse: string;

  @IsString()
  @IsNotEmpty()
  ort: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode("DE")
  plz: string;
}
export class GetLadenDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class CreateLadenDTO {
  @IsString()
  @IsNotEmpty()
  Laden_name: string;

  @IsString()
  @IsNotEmpty()
  Laden_description: string;

  @IsArray()
  @IsNotEmpty()
  Laden_IMG: string[];
  @ValidateNested()
  @Type(() => AddressDTO)
  @IsNotEmpty()
  Laden_adress: AddressDTO;
}
