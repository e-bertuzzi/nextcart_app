import { IsInt, IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePhysicalActivityDto {
  @IsInt()
  @IsNotEmpty()
  activityId!: number;

  @IsInt()
  @IsNotEmpty()
  consumerId!: number;

  @IsString()
  @IsNotEmpty()
  specificActivity!: string;

  @IsInt()
  @IsNotEmpty()
  durationMinutes!: number;

  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
