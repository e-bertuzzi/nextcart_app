import { IsArray, IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterHealthConditionsDto {
  @IsArray()
  @IsOptional()
  // Add a validator for array items as numbers
  selectedConditionIds?: number[];

  @IsOptional()
  @IsString()
  categoryCode?: string;
}
