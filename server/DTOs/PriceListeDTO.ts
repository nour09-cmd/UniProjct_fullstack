import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";
class SalesDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  descriptions: string;
  @IsString()
  @IsNotEmpty()
  img: string;
}

export class CreatePriceListDTO {
  @IsString()
  @IsNotEmpty()
  category: string;

  @ValidateNested()
  @Type(() => SalesDTO)
  @IsNotEmpty()
  sales: [SalesDTO];
}
export class CreatePriceListArrDTO {
  List: CreatePriceListDTO[];
}
