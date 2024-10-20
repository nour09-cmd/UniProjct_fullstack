import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  Length,
} from "class-validator";

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

  //   @IsDateString()
  //   @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  geburtsdatum: string;
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
