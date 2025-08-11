import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAllergenDto {
  @ApiProperty({ example: 'gluten' })
  @IsString()
  allergenId!: string;

  @ApiPropertyOptional({ example: 'Glutine' })
  @IsOptional()
  @IsString()
  allergenName!: string;
}
