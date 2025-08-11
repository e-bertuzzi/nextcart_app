import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateAllergenDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  allergenName!: string;
}
