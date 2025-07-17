import { IsArray, IsOptional, IsString } from 'class-validator';

export class FilterHealthConditionsDto {
  @IsArray()
  @IsOptional()
  selectedConditionIds?: number[];

  @IsString()
  categoryCode?: string;
}
