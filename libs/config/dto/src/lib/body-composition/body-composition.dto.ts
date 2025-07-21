import { IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateBodyCompositionDto {
  @IsDateString()
  date!: string; // formato: 'YYYY-MM-DD'

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;
}
