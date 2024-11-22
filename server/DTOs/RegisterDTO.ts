import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  Length,
  ValidateNested,
} from "class-validator";

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

export class UserRegisterDTO {
  @IsString()
  @IsNotEmpty()
  vorname: string;

  @IsString()
  @IsNotEmpty()
  nachname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber("DE")
  @IsNotEmpty()
  handynummer: string;

  @IsString()
  @IsNotEmpty()
  geburtsdatum: string;
  @ValidateNested()
  @Type(() => AddressDTO)
  @IsNotEmpty()
  address: AddressDTO;
}
