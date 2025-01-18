import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from "class-validator";
export class DayDTO {
  @IsString()
  @IsNotEmpty()
  day: string;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsString()
  @IsNotEmpty()
  available_time_from: string;
  @IsString()
  @IsNotEmpty()
  available_time_to: string;
  @IsNumber()
  @IsNotEmpty()
  appointment_duration: number;
}
export class WeekDaysDTO {
  @ValidateNested()
  @Type(() => DayDTO)
  @IsNotEmpty()
  weekDays: [DayDTO];
}
