import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsPostalCode,
} from "class-validator";

export class GetLadenDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class CreateLadenDTO {
  @IsEmail()
  @IsNotEmpty()
  barber_email: string;

  @IsString()
  @IsNotEmpty()
  Laden_name: string;

  @IsString()
  @IsNotEmpty()
  Laden_description: string;

  @IsArray()
  @IsNotEmpty()
  Laden_IMG: string[];
}

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
